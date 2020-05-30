import React from 'react';
import logo from './logo.svg';
import './App.css';
import {MessageBoard} from "./features/messageboard/MessageBoard";
import {FlaggyFlag} from "./features/flaggyFlag/FlaggyFlag";
import {Navbar} from "./features/navbar/Navbar";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <FlaggyFlag />
        <MessageBoard/>

    </div>
  );
}

export default App;
