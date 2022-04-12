import React, { Component, useState, useEffect } from "react"

export const Row = (row) => {

    return (
        <tr>
            <th>{row.row.instrument}</th>
            <th>{row.row.datetime}</th>
            <th>{row.row.close}</th>
            <th>{row.row.high}</th>
            <th>{row.row.low}</th>
            <th>{row.row.open}</th>
            <th>{row.row.volume}</th>
        </tr>
    );
}

export default Row