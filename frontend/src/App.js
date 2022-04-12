import './App.css';
import React, { Component, useState, useEffect } from "react"
import Table from './components/Table';
import Row from './components/Row';

function App() {
  const [data, setData] = useState([]);

  const getAll = async() => {
    console.log("");
    await fetch(`http://127.0.0.1:8000/api/tickersymbol`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(response => response.json())
    .then(data => {
        setData(data);
    }).catch(error => console.error(error));
    
  }

  return (
    <div className="App">
      <div>
        <button>Upload</button>
        <form>
        <input 
            type="text" 
            placeholder="Instrument name"
          />
          <input 
            type="submit" 
            value="Retrieve"
          />
        </form>
        <button onClick={getAll}>Get all</button>
      </div>
      <div>
        <Table data={data}/>
      </div>

    </div>
  );
}

export default App;
