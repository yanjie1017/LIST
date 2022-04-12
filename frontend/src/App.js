import './App.css';
import React, { Component, useState, useEffect } from "react"
import Table from './components/Table';
import Row from './components/Row';

function App() {
  const [data, setData] = useState([]);
  const [option, setOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  // get options and set options
  useEffect(() => { 
    async function getOption() {
      await fetch(`http://127.0.0.1:8000/api/tickersymbol/option`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      }).then(response => response.json())
      .then(data => {
          setOption(data);
      }).catch(error => console.error(error));
    }
    getOption();
  }, [])

  // set selected option
  useEffect(() => {
    if (option.length > 0) {
      setSelectedOption(option[0]);
    }  
  }, [option])

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

  const getSpecific = async(e) => {
    e.preventDefault();
    await fetch(`http://127.0.0.1:8000/api/tickersymbol/option/${selectedOption}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(response => response.json())
    .then(data => {
        setData(data);
    }).catch(error => console.error(error));
  }

  const handleSelect = (value) => {
    setSelectedOption(value);
  }


  return (
    <div className="App">
      <div>
        <button>Upload</button>
        <form onSubmit={getSpecific}>
          <select onChange={(e) => handleSelect(e.target.value)}>
            {option.map(x => <option key={x} value={x}> {x} </option>)}
          </select> 
          <input 
            type="submit" 
            value="Retrieve data"
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
