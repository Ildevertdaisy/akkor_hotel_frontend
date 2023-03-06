
import { Link } from "react-router-dom";

const Card = ({hotel}) => {
  
  const {name, location} = hotel

  return (
    <div className="card">
         <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt=""/>
         <div class="row-1">
            <h2>{name}</h2>
        </div>

        <div class="row-2">
            <Link to={`hotel/${hotel._id}`}>More</Link>
        </div>
        {/*
        <div class="row-2">
            <span>$1200</span>
        </div>
        <div class="row-3">
            <span>   n   
                <i class="fa-regular fa-bed"></i>
                 6 beds
            </span>
            <span>
                20km 
            </span>
        </div>
        */}
        <div class="address-section">{location}</div>
    </div>
  )
}

export default Card;
