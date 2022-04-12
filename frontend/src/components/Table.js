import React, { Component, useState, useEffect } from "react"
import Row from "./Row";

export const Table = (data) => {

    return (
        <>
            {data ?
                <table>
                    <tr>
                        <th>Instrument</th>
                        <th>Datetime</th>
                        <th>Close</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Open</th>
                        <th>Volume</th>
                    </tr>
                    
                    {data.data.map(x => <Row row={x}/>)}
                </table>
            : "No records."}
        </>
    );
}

export default Table