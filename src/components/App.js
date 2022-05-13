import React, { Component } from "react";
import NftInsuranceDapp from "../abis/NftInsuranceDapp.json";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import Navbar from "./Navbar";
import Main from "./Main";
import Web3 from "web3";
import "./App.css";

//Declare IPFS
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    //Load accounts
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] });

    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = NftInsuranceDapp.networks[networkId];
    if (networkData) {
      const nftinsurance = new web3.eth.Contract(
        NftInsuranceDapp.abi,
        NftInsuranceDapp.networks[networkId].address
      );
      this.setState({ nftinsurance });
      console.log(nftinsurance);
    } else {
      window.alert("Contract not deployed on this network");
    }

    //Get network data
    //Check if net data exists, then
    //Assign contract to a variable
    //Add NFTInsurance to the state
    //Add Counts to the state
    //Iterate nfts and add them to the state (by newest)
    //Set latest NFT to view as default
    //Set loading state to false
    //If network data doesn't exist, log error
  }

  //Get file
  captureFile = (event) => {};

  //Upload file
  uploadFile = (title) => {};

  //Change file
  changeFile = (hash, title) => {};

  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      account: "",
      nftinsurance: null,
      files: [],
      loading: true,
      currentHash: null,
      currentTitle: null,
    };

    //Bind functions
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state.loading ? (
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <Main
          //states&functions
          />
        )}
      </div>
    );
  }
}

export default App;
