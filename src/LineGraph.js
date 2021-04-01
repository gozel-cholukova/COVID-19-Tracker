import React, { useState } from 'react';
import {Line} from "react-chartjs2";
import "./LineGraph.css";

function LineGraph() {
  const [data, setData] = useState({});
  return (
    <div>
      <Line data options />
    </div>
  );
}

export default LineGraph;
