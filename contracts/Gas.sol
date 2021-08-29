//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

import "hardhat/console.sol";
import "./Token.sol";
import "./Nft.sol";

contract Gas {
    string greeting;
    Token[] tokens;
    Token myToken;
    uint256 counter = 100;
    address _tokenAddress;

    constructor() {
        _tokenAddress = address(this);
    }

    function getTokenAddress() public view returns (address name) {
        return (address(myToken));
    }

    function createToken() public returns (address name) {
        myToken = new Token("My Token", "MT");
        return (address(myToken));
    }

    function getTokenInfoFromAddress(address tokenAddress)
        public
        returns (string memory name, string memory symbol)
    {
        Token token = Token(tokenAddress);
        counter++;
        return (token.name(), token.symbol());
    }

    function getInfoWithStorage(address tokenAddress)
        public
        returns (string memory name, string memory symbol)
    {
        counter++;
        return (myToken.name(), myToken.symbol());
    }

    function getInfoWithMemory(address tokenAddress)
        public
        returns (string memory name, string memory symbol)
    {
        Token token = myToken;
        counter++;
        return (token.name(), token.symbol());
    }

    function createTokens() public {
        for (uint256 j = 0; j < 5; j++) {
            tokens.push(new Token("My Token", "MT"));
        }
    }

    function createTokensWithVariable() public {
        for (uint256 j = 0; j < 5; j++) {
            Token token = new Token("My Token", "MT");
            tokens.push(token);
        }
    }
}
