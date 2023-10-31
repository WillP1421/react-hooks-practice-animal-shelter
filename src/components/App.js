import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  useEffect(() => {
    onFindPetsClick();
  },[]);

  const onChangeType = (e) =>  { 
    setFilters({ type: e.target.value})
  }
  function onFindPetsClick() {
    let querystring = ""
    if(filters.type !== "all") {
    querystring = "?type=" + filters.type} 
      fetch(`http://localhost:3001/pets${querystring}`)
      .then(resp => resp.json())
      .then(data => setPets(data))
  }
  const onAdoptPet = (id) => {
    const newAdoptPet = pets.map(pet=> {
      if(pet.id === id) {
        pet.isAdopted = true
      }
      return pet
    })
    
    setPets(newAdoptPet)
    //console.log("onAdoptPet")
  }
  
  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType = {onChangeType} onFindPetsClick = {onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets = {pets} onAdoptPet = {onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;