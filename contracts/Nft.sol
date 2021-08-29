pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nft is ERC721, Ownable {
    constructor(string memory name, string memory symbol)
        public
        ERC721(name, symbol)
    {}
}
