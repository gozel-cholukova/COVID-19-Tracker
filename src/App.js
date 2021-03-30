import React, { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from './InfoBox';
import './App.css';
import Map from './Map';

function App() {
  const [continents, setContinents] =  useState([]);
  const [continent, setContinent] =  useState("worldwide");
  const [continentInfo, setContinentInfo] = useState({});

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  // STATE = how to write a variable in REACT <<<<<<<<

  // https://disease.sh/v3/covid-19/continents
  
  //USEEFFECT = Runs a piece of code based on a given condition
  useEffect(() => {
    fetch ("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })

    fetch ("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setContinentInfo(data);
    })
  }, [])


  useEffect(() => {
    // The code inside here will run once when the component loads and not again after

    // asyns -> send a request, wait for it, do something with input
    const getContinentsData = async () => {
      await fetch("https://disease.sh/v3/covid-19/continents")
      .then((response) => response.json())
      .then((data) => {
        const continents = data.map((continent) => ({
            name: continent.continent,
            value: continent.continentInfo
          }));
          setContinents(continents);          
      });
    };
    getContinentsData();


    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
            name: country.country, //United States, United Kingdom....
            value: country.countryInfo.iso2 //USA, UK, RU
          }));
          setTableData(data);
          setCountries(countries);
      });
    };
    getCountriesData();
  }, []);


  const onContinentChange = async (e) => {
    const continentCode = e.target.value;   

    const url = 
    continentCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/continents/${continentCode}`;

    await fetch(url)
    .then((response) => response.json())
    .then((data) => {      
      setContinent(continentCode);

      setContinentInfo(data);
    })
  };

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url = 
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);

      setCountryInfo(data);
    })
  };
  
  return (
    <>
      <div className="app">
        {/* Header */}
        <div className="app__left">
          <div className="app__header">
          <h1>COVID-19  TRACK by Continents</h1>
            <FormControl className="app__dropdown">
              <Select
              variant="outlined"
              onChange={onContinentChange}
              value={continent}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {/* Loop through all the continents and show a drop down list of the options */}
                {continents.map((continent) => (
                  <MenuItem value={continent.value}>
                    {continent.name}
                  </MenuItem>
                ))}             
                {/* <MenuItem value="worldwide">Worldwide</MenuItem>
                <MenuItem value="worldwide">Europe</MenuItem>
                <MenuItem value="worldwide">Asia</MenuItem>
                <MenuItem value="worldwide">Africa</MenuItem>
                <MenuItem value="worldwide">North America</MenuItem>
                <MenuItem value="worldwide">South America</MenuItem> */}
              </Select>
            </FormControl>
          </div>

          <div className="app__stats">
            <InfoBox 
              title="Coronavirus Cases" 
              cases={continentInfo.todayCases} 
              total={continentInfo.cases} 
            />
            <InfoBox 
              title="Recovered" 
              cases={continentInfo.todayRecovered} 
              total={continentInfo.recovered} 
            />
            <InfoBox 
              title="Deaths" 
              cases={continentInfo.todayDeaths} 
              total={continentInfo.deaths} 
            />
          </div>

          <Map />
        </div>

        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Continent</h3>
            {/* Table */}
            <h3>Worldwide new cases</h3>
            {/* Graph */}
          </CardContent>
        </Card>
      </div>

      
      <div className="app1">
        <div className="app__contiLeft">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new cases</h3>
            {/* Graph */}
          </CardContent>       
        </div>

        <div className="app__contiRight">
          <div className="app__header">        
            <h1>COVID-19  TRACK by Country</h1>
            <FormControl className="app__dropdown">
              <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
              >
                {/* Loop through all the continents and show a drop down list of the options */}
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>
                    {country.name}
                  </MenuItem>
                ))}              
              </Select>
            </FormControl>
          </div>

          {/* Title */} 
          <div className="app__stats">
            <InfoBox 
              title="Coronavirus Cases" 
              cases={countryInfo.todayCases} 
              total={countryInfo.cases} 
            />
            <InfoBox 
              title="Recovered" 
              cases={countryInfo.todayRecovered} 
              total={countryInfo.recovered} 
            />
            <InfoBox 
              title="Deaths" 
              cases={countryInfo.todayDeaths} 
              total={countryInfo.deaths} 
            />
          </div>

          <Map /> 
        </div>

       
      </div>
    </> 
      

            
    
    
    
  );
}

export default App;
