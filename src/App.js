import './App.css';
import React, { Component, useEffect, useState } from 'react';
import Web3 from 'web3';
import { DONATION_ABI, DONATION_ADDRESS } from './config';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);


  useEffect(() => {
    loadBlockchainData();
  }, [])

  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts();
    const contractDonation = new web3.eth.Contract(DONATION_ABI, DONATION_ADDRESS);
    setAccount(accounts[0]);
    setContract(contractDonation);
    const balance = await contractDonation.methods.getBalance().call();
    setBalance(balance);
  }

  async function makeTransaction() {
    contract.methods.fund().send({value: amount, from: account}).then(() => {

    },);
  }

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
