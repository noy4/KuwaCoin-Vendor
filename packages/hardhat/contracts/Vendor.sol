pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: UNLICENSED

import '@openzeppelin/contracts/access/Ownable.sol';
import './KuwaCoin.sol';

contract Vendor is Ownable {
  KuwaCoin public kuwaCoin;
  uint256 public constant TOKEN_RATE = 200_000;

  constructor(address tokenAddress) {
    kuwaCoin = KuwaCoin(tokenAddress);
  }

  event BuyTokens(address buyer, uint256 ethAmount, uint256 tokenAmount);

  function buyTokens() public payable returns (uint256 tokenAmount) {
    tokenAmount = msg.value * TOKEN_RATE;
    bool sent = kuwaCoin.transfer(msg.sender, tokenAmount);
    require(sent, 'Failed to buy');
    emit BuyTokens(msg.sender, msg.value, tokenAmount);
  }

  function sellTokens(uint256 tokenAmount) public returns (uint256 ethAmount) {
    kuwaCoin.transferFrom(msg.sender, address(this), tokenAmount);
    ethAmount = tokenAmount / TOKEN_RATE;
    (bool sent, ) = msg.sender.call{value: ethAmount}('');
    require(sent, 'Failed to sell');
  }

  function withdraw() public onlyOwner returns (bool) {
    (bool sent, ) = msg.sender.call{value: address(this).balance}('');
    require(sent, 'Failed to withdraw');
    return sent;
  }
}
