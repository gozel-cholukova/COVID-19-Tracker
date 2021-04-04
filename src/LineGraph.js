import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import "./LineGraph.css";

function LineGraph() {
  const [data, setData] = useState({});
  
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
    .then((response) => response.json())
    .then ((data) => {

    });
  }, []);

  const buildChartData = data => {
    const chartData = [];
    let lastDataPoint;
  }
  return (
    <div>
      <h1>Graph</h1>
      {/* <Line 
        data 
        options 
      /> */}
    </div>
  );
}

export default LineGraph;
