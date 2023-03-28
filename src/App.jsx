import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [stateFilter, setStateFilter] = useState("california");
  const [typeFilter, setTypeFilter] = useState("micro");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.filter((item) =>
        item.name === searchValue
      )
      console.log(filteredData)
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
  }

  useEffect(() => {
    const fetchAllBreweries = async () => {
      const response = await fetch(
        "https://api.openbrewerydb.org/v1/breweries?by_state=California&by_type=micro&per_page=200"
      );
      const json = await response.json();
      console.log(json)
      setList(json);
    }
    fetchAllBreweries().catch(console.error)
  }, []);

  // for when stateFilter changes
  useEffect(() => {
    const fetchStateBreweries = async () => {
      const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries?by_state=${stateFilter ? stateFilter : "California"}&per_page=200`
      );
      const json = await response.json();
      console.log(json)
      setList(json);
    }
    fetchStateBreweries().catch(console.error)
  }, [stateFilter]);

  // for when typeFilter changes
  useEffect(() => {
    const fetchStateBreweries = async () => {
      const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries?by_type=${typeFilter ? typeFilter : "micro"}&per_page=200`
      );
      const json = await response.json();
      console.log(json)
      setList(json);
    }
    fetchStateBreweries().catch(console.error)
  }, [typeFilter]);

  return (
    <div className="App">
      <h1>My Local Breweries</h1>
      <input
        type={"text"}
        placeholder={"Search name..."}
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
      <input
        type={"text"}
        placeholder={"Filter by state..."}
        onChange={(inputString) => setStateFilter(inputString.target.value)}
      />
      <input
        type={"text"}
        placeholder={"Filter by type..."}
        onChange={(inputString) => setTypeFilter(inputString.target.value)}
      />
      <br/>
      <p>Available Brewery Types: micro, nano, regional, brewpub, large, planning, bar, contract, proprietor, closed</p>
      <ul>
        {searchInput.length > 0
          ? Object.entries(filteredResults).map(([brewery]) =>
            <li key={filteredResults[brewery].name}>{`Name: ${filteredResults[brewery].name} 
                                                      State: ${filteredResults[brewery].state} 
                                                      Type: ${filteredResults[brewery].brewery_type 
                                                                ? filteredResults[brewery].brewery_type
                                                                : "Undefined"}`}</li> )
          : (list
              ? Object.entries(list).map(([brewery]) =>
                <li key={list[brewery].name}>{`Name: ${list[brewery].name} 
                                                State: ${list[brewery].state} 
                                                Type: ${list[brewery].brewery_type
                                                          ? list[brewery].brewery_type
                                                          : "Undefined"}`}</li>)
              : null)
        }
      </ul>
    </div>
  )
}

export default App
