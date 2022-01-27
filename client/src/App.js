import React from "react";
import { Chat } from "./components/Chat/Chat";
import s from './App.css'

function App() {
  return (
    <div className={s.app}>
      <Chat />
    </div>
  );
}

export default App;
