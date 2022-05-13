//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    constructor() ERC721("MyNFT", "NFT") {}
    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
contract NftInsuranceDapp is ERC721URIStorage, Ownable, MyNFT {
//define a User
    struct User {
        address user;
        uint amount;
        // we need to change the User address into qunique NFT ID
        // uint id;
    }    
// create an array of users
    User[] public users;
// set a public payable function for user sign-up
    function createUser() public payable {
        require(msg.value >= 0);
        users.push(User(msg.sender, msg.value));
    }
}