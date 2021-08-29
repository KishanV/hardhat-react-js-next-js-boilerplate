pragma solidity ^0.8.0;
import "./Token.sol";
import "./Nft.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenFactory is Ownable {
    event TokenCreated(address indexed tokenAddress);
    event NftCreated(address indexed tokenAddress);

    Token[] tokens;

    constructor() {
        createToken("My Token", "KD");
        createNft("My Nft", "NT");
    }

    function createToken(string memory name, string memory symbol)
        public
        returns (bool done)
    {
        Token token = new Token(name, symbol);
        tokens.push(token);
        emit TokenCreated(address(token));
        return true;
    }

    function mint(uint256 id, uint256 amount) public {
        Token token = tokens[id];
        token.mint(address(this), amount);
    }

    function createNft(string memory name, string memory symbol)
        public
        returns (bool done)
    {
        Nft nft = new Nft(name, symbol);
        emit NftCreated(address(nft));
        return true;
    }

    function getTokenDetails(address tokenAddress)
        public
        view
        returns (string memory name, string memory symbole)
    {
        Token token = Token(tokenAddress);
        return (token.name(), token.symbol());
    }
}
