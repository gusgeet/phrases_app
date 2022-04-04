import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  let [responseData, setResponseData] = React.useState('');

  const fetchData = React.useCallback(() => {
    axios({"method": "GET",
    "url": "https://quotes15.p.rapidapi.com/quotes/random/",
    "headers": {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_API_KEY
    }, "params": {
      "language_code": "es"
    } 
  })
  .then((response) => {
    setResponseData(response.data)
  })
  .catch((error) => {
    console.log(error)
  })
},[])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])
  

  return (
      <div className="app">
        <header className="app-header">
          <h1>
            Frases aleatorias en un click
          </h1>
          <button type='button' onClick={fetchData}>Frase aleatoria</button>
        </header>
        <main>
          {responseData &&
          <blockquote>
          "{responseData && responseData.content}"
            <small>{responseData && responseData.originator && responseData.originator.name}
            </small>
          </blockquote>
          }
        </main>
      </div>
    )
}


export default App
