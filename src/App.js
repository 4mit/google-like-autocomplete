import React from "react";
import "./styles.css";
import * as data from "./data";
import Autocomplete from "./AutoComplete";
const App = () => {
  return (
    <div className="App">
      <Autocomplete options={data.default} />
    </div>
  );
};

export default App;
