import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import "./App.css";
import abi from "./utils/PdeX.json";

function App() {
  const [current, setAccount] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupLogo, setGroupLogo] = useState("");
  const [message, setMessage] = useState();
  const [messageData, setMessageData] = useState([]);
  const [messageWait, setMessageWait] = useState(false);

  const contractAddress = "0xC10D144F8cC989Be41cCC99E160F6713E9130301";

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
        // Get Message DB
        getAllMessage();
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
      getAllMessage();
    } catch (error) {
      console.log(error);
    }
  };

  const createGroup = (e) => {
    e.preventDefault();
    console.log("Group created");
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const PdeXContract = new ethers.Contract(
          contractAddress,
          abi.abi,
          signer
        );

        let deMessage = await PdeXContract.createMessage(message);
        console.log("waiting");
        await deMessage.wait();
        console.log("Done");

        console.log("Message sent");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "groupName") {
      setGroupName(value);
    } else if (name === "groupLogo") {
      setGroupLogo(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  const getAllMessage = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const PdeXContract = new ethers.Contract(
          contractAddress,
          abi.abi,
          signer
        );

        let data = await PdeXContract.getAllMessages();

        // console.log(`There is ${data.length}, something like: ${data}`);

        let cleanMessages = [];
        data.forEach((item) => {
          cleanMessages.push({
            message: item.message,
            address: item.owner,
          });
        });
        setMessageData(cleanMessages);
      }
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
              <h2 className="groupHeadings">List of Groups</h2>
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
              <h2 className="groupHeadings">CreateGroup</h2>
              <form>
                <label>
                  {" "}
                  Group Name
                  <input
                    type="text"
                    placeholder="Group Name"
                    id="groupName"
                    name="groupName"
                    onChange={onChange}
                  />
                </label>
                <label>
                  {" "}
                  Group Logo
                  <input
                    type="text"
                    placeholder="enter image URl"
                    id="groupLogo"
                    name="groupLogo"
                    onChange={onChange}
                  />
                </label>
                <button onClick={createGroup}>Create</button>
              </form>
            </div>
          </div>

          {/* Send Messages */}

          <div className="sendMessages">
            <div className="container">
              <h2 className="groupHeadings">List of Messages</h2>
              <ul>
                {messageData.length > 0
                  ? messageData.map((item) => (
                      <li>
                        {item.message} <span>{item.address}</span>
                      </li>
                    ))
                  : "There is no messages"}
              </ul>
              <h2 className="groupHeadings">Create Message</h2>
              <form>
                <label htmlFor="message">Message:</label>
                {!messageWait ? (
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={onChange}
                  ></textarea>
                ) : (
                  "Waiting"
                )}

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
