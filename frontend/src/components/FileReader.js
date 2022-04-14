import React, { Component, useState, useEffect } from "react"
import Papa from 'papaparse';

class FileReader extends React.Component {
    constructor() {
        super();

        this.state = {
            csvfile: undefined,
            isUploaded: 0,
        };
    }
  
    handleFile = (event) => {
        event.preventDefault();
        this.setState({csvfile: event.target.files[0]});
        this.setState({isUploaded: 0})
    };

    importCSV = (event) => {
        event.preventDefault();
        const { csvfile } = this.state;
        Papa.parse(csvfile, {
            complete: this.updateData,
            header: true
        });
    };

    // import csv 
    updateData = (result) => {
        var content = result.data;
        console.log(content);
        this.uploadData(content);
    }

    // upload file
    uploadData = async(data) => {
        data.map(x => {
            fetch(`http://127.0.0.1:8000/api/tickersymbol/`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify(x)
            }).then(response => {
                if (!response.ok) {
                    this.setState({isUploaded: 2})
                } 
            })
            .catch(error => console.error(error));
        });
        if (this.state.isUploaded === 2) return;
        this.setState({isUploaded: 1})
        this.props.uploadFile();
    }

    response = () => {
        const text = [
            "", "File uploaded successfully.", "Error."
        ]
        return text[this.state.isUploaded]
    }
  
    render() {
      return (
        <div className="uploadTab">
            <label>Upload a csv file</label>
            <form onSubmit={this.importCSV}>
                <input type="file" accept=".csv" onChange={this.handleFile}/>
                <input type="submit" value="Upload"/>
                <p>{this.response()}</p>
            </form> 
        </div>
      );
    }
  }
  
  export default FileReader;