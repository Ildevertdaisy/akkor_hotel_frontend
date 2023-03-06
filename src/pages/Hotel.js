
import Layout from "../components/Layout"
import useSWR from 'swr';
import { useParams } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const endpoint = 'http://127.0.0.1:8000/hotels';


async function fetcher(endpoint) {
    const response = await fetch(endpoint);
    const json = await response.json();
    return json;
}

function getCorrectDate(dateStr){
  const date = new Date(dateStr);
  const utcTimestamp = date.getTime() - (date.getTimezoneOffset() * 60 * 1000);
  const parisTimestamp = utcTimestamp + (3600 * 1000); // Add 1 hour (3600 seconds) for Paris time
  const parisDate = new Date(parisTimestamp);
  const year = parisDate.getUTCFullYear();
  const month = (parisDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = parisDate.getUTCDate().toString().padStart(2, "0");
  const parisDateStr = `${year}-${month}-${day}`;
  return parisDateStr
}

function Hotel() {
  
  const {id} = useParams();  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  //idle|loading|success|error
  const [status, setStatus] = useState('idle');


  const {auth} = useAuth();

  const {data, error} = useSWR(`${endpoint}/${id}`, fetcher);

  console.log(data);

  const hotel = data;
  console.log(hotel?._id);
  
  async function handleSubmit(event){
    event.preventDefault();

   const start = getCorrectDate(startDate);
   const end = getCorrectDate(endDate);
   const token = auth.token;

   if (!token) {
      setStatus("error")
   } 

   setStatus("loading");

   const response = await fetch("http://127.0.0.1:8000/bookings", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          start_date: start,
          end_date: end,
          hotel_id: hotel?._id
        })
   });

   if (response.status === 201) {
      setStatus("success");
   } else {
       setStatus("error")
   }

  }

  return (
    <Layout>
        <section>
          <div className="column-1">
               
          </div>
          <div className="column-2">
              {data?.name && (<h2>{data.name}</h2>)}
              {data?.location && (<p>{data.location}</p>)}
              {data?.description && (<p>{data.description}</p>)}
                {status === "error" && (<p>You must be logged in to make a booking of this hotel.</p>)}
                {status === "success" && (<p>Booking successfully added.</p>)}
                 <form onSubmit={handleSubmit}>
                 <div className="date-input">
                       <label htmlFor="end_date">Start date</label>
                       <DatePicker
                        id={"end_date"}
                        name={"end_date"}
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date)
                            
                        }}
                        dateFormat="yyyy/MM/dd"
                       />
                   </div>
                   <div className="date-input">
                       <label htmlFor="end_date">End date</label>
                       <DatePicker
                        id={"end_date"}
                        name={"end_date"}
                        selected={endDate}
                        onChange={(date) => {
                            setEndDate(date)
                        }}
                        dateFormat="yyyy/MM/dd"
                       />
                   </div>
                  <div className="button-section">
                    <button>Booking</button>
                    {status === "loading" && (<p>Adding booking....</p>)}
                  </div>
                 </form>
                 {}
          </div>
        </section>
    </Layout>
  )
}

export default Hotel