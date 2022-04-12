import React, { Component, useState, useEffect } from "react"
import Row from "./Row";

export const Table = (data) => {

    return (
        <>
            {data.data.length ?
                <table>
                    <thead>
                        <tr>
                            <th>Instrument</th>
                            <th>Datetime</th>
                            <th>Close</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Open</th>
                            <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map(x => <Row key={x.id} row={x}/>)}
                    </tbody>
                </table>
            : "No records."}
        </>
    );
}

export default Table