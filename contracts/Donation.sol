//SPDX-License-Identifier: MIT

pragma solidity >=0.6.6 <0.9.0;

contract Donation {
    address public owner;
    mapping(address => uint) public donationByAddress;
    uint256 total = 0;
    event donated(uint value);
    
    constructor() public {
        owner = msg.sender;
    }

    function fund() public payable {
        donationByAddress[msg.sender] += msg.value;
        total += msg.value;
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    modifier onlyOwner {
        require (msg.sender == owner);
        _;
    }

    function withdraw() payable onlyOwner public {
        (bool sent, bytes memory data) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to withdraw");
    }
}
