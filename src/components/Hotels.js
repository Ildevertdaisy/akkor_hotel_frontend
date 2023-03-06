
import Card from "./Card";
import { range } from "../utils/utils";
import {useState, useEffect} from 'react';


function Hotels({hotels}) {
  /*const [hotels, setHotels]= useState([]);
  useEffect(() => {
      console.log("Fetching data from the API.");
  }, [hotels]);*/

  return (
    <div className="hotels-grid">
        {hotels.map((hotel, index) => {
          return <Card hotel={hotel} key={index}/>
        })}   
    </div>
  )
}

export default Hotels