//SPDX-License-Identifier: MIT

pragma solidity >=0.6.6 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
contract Donation is Ownable {
    mapping(address => uint) public donationByAddress;
    uint256 public totalDonated;
    
    constructor() {
        totalDonated = 0;
    }

    function fund() public payable {
        donationByAddress[msg.sender] += msg.value;
        totalDonated += msg.value;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdraw() payable onlyOwner public {
        (bool sent, bytes memory data) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to withdraw");
    }
}
