import React from "react";
import { ether } from "ethers";

function App() {
  const handleClick = () => {
    alert("connect metamask");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PdeX</h1>
      </header>
      <section className="hero">
        <p>A place to go solo or group up</p>
        <button onClick={handleClick}>Connect Now</button>
      </section>
      <footer>
        <p>
          Made with thought{" "}
          <a href="#" target="_blank">
            @ckovbel
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
