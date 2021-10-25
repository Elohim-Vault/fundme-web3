import './App.css';
import React, {useEffect, useState } from 'react';
import Web3 from 'web3';
import { DONATION_ABI, DONATION_ADDRESS } from './config';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';


function App() {
  var web3 = new Web3(Web3.givenProvider);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    loadBlockchainData();
  }, [])

  async function loadBlockchainData() {
    const accounts = await web3.eth.getAccounts();
    const contractDonation = new web3.eth.Contract(DONATION_ABI, DONATION_ADDRESS);
    setAccount(accounts[0]);
    setContract(contractDonation);
    let balance = await contractDonation.methods.getBalance().call();
    balance = web3.utils.fromWei(balance, 'ether');
    setBalance(balance);
  }

  async function makeTransaction() {
    setIsPending(true);
    contract.methods.fund().send({value: web3.utils.toWei(amount, 'ether'), from: account})
    .then(async transaction => {
      let balance = await contract.methods.getBalance().call();
      balance = web3.utils.fromWei(balance, 'ether');
      setBalance(balance);
      setIsPending(false);
    });

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
            <h1>Total já arrecadado: <span>{balance} Ether</span></h1>
            { 
            !isPending && 
            <InputGroup className="mb-3">
              <InputGroup.Text>Ether</InputGroup.Text>
              <FormControl onChange={e => setAmount(e.target.value)}/>
              <Button type="submit" onClick={makeTransaction}>Contribuir</Button>
            </InputGroup>
            }
            {
              isPending && 
              <Spinner animation="border" role="status">

              </Spinner>
            }
          </Card.Body>
        </Card>
      </div>
    );
    </div>
  );
}

export default App;
