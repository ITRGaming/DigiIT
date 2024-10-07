import {useState, useEffect} from 'react'
import './App.css';

function App() {

  const [sim_number, setSimNo] = useState("");
  const [phone_number, setPhoneNo] = useState("");
  const [sim_details, setSimDetails] = useState({});
  const handleOnActivate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/activate', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              sim_number: sim_number,
              phone_number: phone_number,
              status: 'activated',
              activation_date: new Date(),
          }),
      });

      const data = await response.json();
      console.log('Activation successful:', data);
      if (data) {
        alert("Data saved succesfully");
      }
      else {
          alert("Error in saving data, check data before trying again");
        }
        
        // Optionally, update state here if needed
        
      } catch (error) {
      alert("Error in saving data, check data before trying again");
      console.error('Error activating SIM:', error);
  }
  }

  const handleOnDeactivate = async (e) => {
    e.preventDefault();
    
    let result = await fetch(
    `http://localhost:5000/deactivate/${sim_number}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sim_number: sim_number,
          status: 'deactived',
          activation_date: '',
      })
    })
    result = await result.json();
    console.warn(result);
    if (result) {
        alert("Data saved succesfully");
    }
    else {
      alert("Error in saving data, check data before trying again");
    }
  }
  const handleOnReactivate = async (e) => {
    e.preventDefault();
    
    let result = await fetch(
    `http://localhost:5000/reactivate/${sim_number}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sim_number: sim_number,
          status: 'actived',
          activation_date: new Date(),
      })
    })
    result = await result.json();
    console.warn(result);
    if (result) {
        alert("Data saved succesfully");
    }
    else {
      alert("Error in saving data, check data before trying again");
    }
  }

  const handleOnDetail = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:5000/sim-details/${sim_number}`)
    .then(response => response.json())
    .then(data => setSimDetails(data))
    .catch(error => console.error('Error fetching user:', error));
  }

  return (
    <div className="main">
      <div className="simNum">
        <form>
          <label>Sim Number</label><br/>
          <input type='number' onChange={(e) => setSimNo(e.target.value)}></input><br/>

          <label>Phone Number</label><br/>
          <input type='number' onChange={(e) => setPhoneNo(e.target.value)}></input><br/>
          <button onClick={handleOnActivate}>Activate</button>
          <button onClick={handleOnReactivate}>Reactivate</button>
          <button onClick={handleOnDeactivate}>Deactivate</button>
          <button onClick={handleOnDetail}>Get Details</button>
        </form>
      </div>
      <div className="output">
        <h3>Sim number : {sim_details.sim_number}</h3>
        <h3>Status : {sim_details.status}</h3>
        <h3>activation Date :{sim_details.activation_date}</h3>
      </div>
    </div>
  );
}

export default App;
