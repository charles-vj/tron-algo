import {useState} from 'react'
import './App.css';
import axios from 'axios'
import BigNumber from "bignumber.js";
import { ethers } from "ethers";


function App() {

  const[output,setOutput] =useState([]);

  const input = {
    "tok1": "THb4CqiFdwNHsWsQCs4JhzwjMWys4aqCbF",
    "tok2": "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    "inputAmount":"100"
  };

  



  const getData = async () => {
    console.log("hello")
    axios.post('https://tron-aggrigator.herokuapp.com/api/v1/input-amount', { 
      "tok1": "THb4CqiFdwNHsWsQCs4JhzwjMWys4aqCbF",
    "tok2": "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    "inputAmount":"100" }).then(res => {
      console.log(res);
      console.log(res.data);
      setOutput(res.data);
    })
    
}

  const getExchangeMax = () => {
    const map1 = new Map();
    for(var i=0; i < output.length; i++) {
      if(map1.has(output[i].exchange)){
        if(ethers.BigNumber.from(map1.get(output[i].exchange)).lt(ethers.BigNumber.from(output[i].amount))){
          map1.set(output[i].exchange, output[i].amount);
          console.log("hello")}

      }
      else {
        map1.set(output[i].exchange, output[i].amount);
      }
    }
    console.log(map1);
    console.log("Max:", Math.max(...map1.values()))
  }
  return (
    <div className="App">
      <button onClick={getData}>API DATA</button>
      <button onClick={getExchangeMax}>MAX FROM DATA</button>
      
    </div>
  );
}

export default App;
