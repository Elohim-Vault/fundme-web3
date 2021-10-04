import React, {useEffect, useState} from "react"
import SimpleStorageContract from "./contracts/Donation.json";
import getWeb3 from "./getWeb3";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


import "./App.css";

const App = () => {
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    
    useEffect(() => {
      async function loadBlockchain() {
        try {
          const web3 = await getWeb3();
          const accounts = await web3.eth.getAccounts();
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = SimpleStorageContract.networks[networkId];
          const donation = new web3.eth.Contract(
              SimpleStorageContract.abi,
              deployedNetwork && deployedNetwork.address,
          );
          const balance = await donation.methods.getBalance().call();
          setBalance(balance);
          setAccount(accounts[0]);
          setContract(donation);
        }
        catch(error)
        {
          alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
      }
      loadBlockchain()


    }, []);

    async function makeTransaction() {
        contract.methods.fund().send({value: amount, from: account});
    }

    return (
      <div id="container">
        <Card style={{
          width: '50rem',
          textAlign: 'center',
          }}>
          <Card.Body>
            <Card.Title>Você pode contribuir com Ethereum!</Card.Title>
            <h1>Total já arrecadado: <span>{balance} wei</span></h1>
            <InputGroup className="mb-3">
              <InputGroup.Text>Wei</InputGroup.Text>
              <FormControl onChange={e => setAmount(e.target.value)}/>
              <Button type="submit" onClick={makeTransaction}>Contribuir</Button>
            </InputGroup>
          </Card.Body>
        </Card>
      </div>
    );
}
 
export default App;
