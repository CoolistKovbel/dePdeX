import React, { useEffect, useState } from "react";
import { ether } from "ethers";

function App() {
  const [current, setAccount] = useState("");

  const checkIfWalletIsConnect = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("You dont have metamask, download it");
      } else {
        console.log("We have an object", ethereum);
      }

      // on every function call we also want to authorize access to user wallet
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found account", account);
        setAccount(account);
      } else {
        console.log("Nothing found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectAccount = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log(accounts);
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <div className="currentBlock">
      {current.length > 0 ? (
        <div className="yesAccount">
          <h1>Hello World</h1>
          <code>Account:{current}</code>

          {/* Join OR Create Group */}

          {/* Send Messages */}
        </div>
      ) : (
        <div className="noAccount">
          <header className="App-header">
            <h1>PdeX</h1>
          </header>
          <section className="hero">
            <p>A place to go solo or group up</p>
            <button onClick={connectAccount}>Connect Now</button>
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
      )}
    </div>
  );
}

export default App;
