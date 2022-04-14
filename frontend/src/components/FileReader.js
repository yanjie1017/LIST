import React, { Component, useState, useEffect } from "react"
import Papa from 'papaparse';

class FileReader extends React.Component {
    constructor() {
        super();

        this.state = {
            csvfile: undefined
        };
    }
  
    handleFile = (event) => {
        event.preventDefault();
        this.setState({csvfile: event.target.files[0]});
    };

    importCSV = (event) => {
        event.preventDefault();
        const { csvfile } = this.state;
        Papa.parse(csvfile, {
            complete: this.props.updateData,
            header: true
        });
    };
  
    render() {
      return (
        <div className="uploadTab">
            <form onSubmit={this.importCSV}>
                <label>Upload a csv file</label>
                <input type="file" accept=".csv" onChange={this.handleFile}/>
                <input type="submit" value="Upload"/>
            </form> 
        </div>
      );
    }
  }
  
  export default FileReader;