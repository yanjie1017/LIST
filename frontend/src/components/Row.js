import React, { Component, useState, useEffect } from "react"

export const Row = ({row}) => {

    return (
        <tr>
            <th>{row.instrument}</th>
            <th>{row.datetime}</th>
            <th>{row.close}</th>
            <th>{row.high}</th>
            <th>{row.low}</th>
            <th>{row.open}</th>
            <th>{row.volume}</th>
        </tr>
    );
}

export default Row