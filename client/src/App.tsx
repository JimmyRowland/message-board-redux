import React from 'react';
import logo from './logo.svg';
import './App.css';
import {MessageBoard} from "./features/messageboard/MessageBoard";
import {FlaggyFlag} from "./features/flaggyFlag/FlaggyFlag";
import {TopMenu} from "./features/navbar/TopMenu";

function App() {
  return (
    <div className="App">
        <TopMenu/>
        <FlaggyFlag />
        <MessageBoard/>

    </div>
  );
}

export default App;
