import React from 'react';
import './Tabel.css';

function Tabel({continents}) {
  return (
    <div className="table1">
      {continents && continents.map(({continent, cases}) => (
        <tr>
          <td>{continent}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))} 
    </div> 
  );
}

export default Tabel
