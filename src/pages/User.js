
import Layout from "../components/Layout"
import useSWR from 'swr';
import { useState } from "react";
import useAuth from "../hooks/useAuth";


async function fetcher(user) {
  const response = await fetch("http://127.0.0.1:8000/bookings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
  });
  const json = await response.json();
  const response_2 = await fetch(`http://127.0.0.1:8000/hotels/${json[1].hotel_id}`);
  const hotel = await response_2.json()


  const allBookings_response = await fetch("http://127.0.0.1:8000/bookings/", {
       method: "GET",
       headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
  });

  return {
      bookings: json,
      hotel: hotel,
      allBookings: allBookings_response.json()
  };
}


function User() {
  const {auth, setAuth} = useAuth();
  const {data, error} = useSWR(auth, fetcher);
  
  const bookings = data

  return (
    <Layout>
         <div className="user-info">
            <h2>My Infos</h2>
              <ul>
                  <li>Username: {auth?.username}</li>
                  <li>Email: {auth?.email}</li>
                  <li>Role: {auth?.role}</li>
              </ul>
         </div>

         <div className="user-bookings">
             <h2>My Bookings</h2>
              <ul> 
                  
                  <li>{bookings?.hotel?.name}</li>
                  
                  
              </ul>
         </div>

         {auth?.role === "ADMIN" && (<div className="user-bookings">
             <h2>All customer boonkings</h2>

         </div>)}
    </Layout>
  )
}

export default User