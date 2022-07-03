import React, { useEffect, useState } from "react";
import { ether } from "ethers";

import "./App.css";

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

  const createGroup = (e) => {
    e.preventDefault();
    console.log("Group created");
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Message sent");
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <div className="currentBlock">
      {current.length > 0 ? (
        <div className="yesAccount">
          <header className="blockAccount">
            <h1>PdeX</h1>
            <ul>
              <li>MyAccount</li>
              <li>Account:{current}</li>
            </ul>
          </header>

          {/* Join OR Create Group */}

          <div className="createGroup">
            <div className="container">
              <h2>List of Groups</h2>
              <ul>
                <li>
                  <div className="group">
                    <div className="groupImgContainer">
                      <img src="https://via.placeholder.com/100" />
                    </div>
                    <h5>Group 1</h5>
                  </div>
                </li>
                <li>
                  <div className="group">
                    <div className="groupImgContainer">
                      <img src="https://via.placeholder.com/100" />
                    </div>
                    <h5>Group 2</h5>
                  </div>
                </li>
                <li>
                  <div className="group">
                    <div className="groupImgContainer">
                      <img src="https://via.placeholder.com/100" />
                    </div>
                    <h5>Group 3</h5>
                  </div>
                </li>
              </ul>
              <h2>CreateGroup</h2>
              <form>
                <label>
                  {" "}
                  Group Name
                  <input type="text" placeholder="Group Name" id="groupName" />
                </label>
                <label>
                  {" "}
                  Group Logo
                  <input
                    type="text"
                    placeholder="enter image URl"
                    id="groupLogo"
                  />
                </label>
                <button onClick={createGroup}>Create</button>
              </form>
            </div>
          </div>

          {/* Send Messages */}

          <div className="Send Messages">
            <div className="container">
              <h2>List of Messages</h2>
              <ul>
                <li>Message 1</li>
                <li>Message 2</li>
                <li>Message 3</li>
              </ul>
              <h2>Create Message</h2>
              <form>
                <label htmlFor="message" style={{ display: "block" }}>
                  Message
                </label>
                <textarea id="message"></textarea>
                <button onClick={sendMessage}>Send Message</button>
              </form>
            </div>
          </div>
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
