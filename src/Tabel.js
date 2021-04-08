import React from 'react';
import './Tabel.css';
import numeral from "numeral";

function Tabel({continents}) {
  return (
    <div className="table1">
      {continents && continents.map(({continent, cases}) => (
        <tr>
          <td>{continent}</td>
          <td>
          <strong>{numeral(cases).format("000,000")}</strong>
          </td>
        </tr>
      ))} 
    </div> 
  );
}

export default Tabel
