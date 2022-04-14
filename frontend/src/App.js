import './App.css';
import React, { Component, useState, useEffect } from "react"

import Table from './components/Table';
import FileReader from './components/FileReader';

function App() {
  const [isUpdated, setIsUpdated] = useState(0);
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
  }, [isUpdated])

  // set selected option
  useEffect(() => {
    if (option.length > 0) {
      setSelectedOption(option[0]);
    }  
  }, [option])

  // get all
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

  // get specific instrument
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

  // upload file
  const uploadFile = async(data) => {
    setIsUpdated(1-isUpdated);
  }

  // handle option
  const handleSelect = async(event) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
  }

  // clear data
  const clear = async(event) => {
    event.preventDefault();
    setData([]);
  }

  return (
    <div className="App">
      <div className='selectTab'>
        <FileReader uploadFile={uploadFile}/>

        <div className='getTab'>
          <label>Display data</label>
          <form onSubmit={getSpecific}>
            <select onChange={handleSelect}>
              {option.map(x => <option key={x} value={x}> {x} </option>)}
            </select> 
            <input type="submit" value="Retrieve data"/>
          </form>
          <button onClick={getAll}>Retrieve all</button>
          <button onClick={clear}>Clear</button>
        </div>
      </div>

      <div className='displayTab'>
        <Table data={data}/>
      </div>

    </div>
  );
}

export default App;
