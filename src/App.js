
import Layout from "./components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./components/Card";
import Hotels from "./components/Hotels";

import { useState, useEffect } from "react";

// const hotels = [
//     {
//         name: "Akkor",
//         location: "Lorem ipsum",
//         description: "lorem ipsum"
//     },
//     {
//         name: "Akkor",
//         location: "Lorem ipsum",
//         description: "lorem ipsum"
//     },
//     {
//         name: "Akkor",
//         location: "Lorem ipsum",
//         description: "lorem ipsum"
//     },
// ];


const ENDPOINT = 'http://127.0.0.1:8000/search';

function App() {
 /*
 const [hotels, setHotels] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
    console.log("We have hotels.");
 }, [hotels])
 */

 const [ searchTerm, setSearchTerm] = useState('');
 const [ searchResults, setSearchResults] = useState(null);


  // idle | loading | success | error | empty
  const [status, setStatus] = useState('idle');

  async function handleSearch(event) {
    event.preventDefault();

    setStatus('loading');

    const url = `${ENDPOINT}?name=${searchTerm}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json)
    console.log(response.status)
    if (response.status == 200) {
      setSearchResults(json);
      setStatus(
        json.length > 0
          ? 'success'
          : 'empty'
      );
    } else {
      setStatus('error');
    }
  }

  return (
      <Layout>
          <form className="search-form" onSubmit={handleSearch}>
          <div className="search-section">
              <label>Seach</label>
               <input 
               required={true}
               type={"text"} 
               placeholder="Akkor..."
               value={searchTerm}
               onChange={(event) => {
                  setSearchTerm(event.target.value);
               }}
               />
          </div>
          </form>
          {/* 
          <Card hotel={hotel}/>
          <Card hotel={hotel}/>
          <Card hotel={hotel}/>
        */}
        {status === 'idle' && searchTerm === '' && (
            <p>Welcome to Akkor search!</p>
            )}
        {status === 'loading' && (
            <img src="spinner.svg"/> 
        )}
        {status === 'error' && (
          <p>Something went wrong!</p>
        )}
        {status === 'empty' && (
          <p>No results</p>
        )}
        {status === 'success' && (
          <div className="search-results">
            <h2>Search Result:</h2>
            <Hotels hotels={searchResults}/>
          </div>
        )}
          {/* <h1>Hotels</h1>
          <Hotels hotels={searchResults}/> */}
      </Layout>
  )
}

export default App;