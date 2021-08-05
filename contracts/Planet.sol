//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./ERC721.sol";

import "hardhat/console.sol";

contract Planet is ERC721 {
    string[] public planets;
    mapping(string => bool) _planetExists;

    constructor() ERC721("Planet", "PLANET") {
        console.log(">=> Deploying Planet Wars Contract ...");
        // console a ascii of a rocket
    }

    function getTotalNoOfPlanets() public view returns (uint256) {
        return planets.length;
    }

    // minting a new planet
    function mint(string memory _planet) public {
        require(!_planetExists[_planet]);
        planets.push(_planet);
        uint256 _id = planets.length - 1;
        _mint(msg.sender, _id);
        _planetExists[_planet] = true;
    }
}
