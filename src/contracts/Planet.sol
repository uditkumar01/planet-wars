pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract Planet is ERC721Full {
    string[] public planets;
    mapping(string => bool) _planetExists;

    constructor() public ERC721Full("Planet", "PLANET") {}

    // E.G. planet = "#FFFFFF"
    function mint(string memory _planet) public {
        require(!_planetExists[_planet]);
        uint256 _id = planets.push(_planet);
        _mint(msg.sender, _id);
        _planetExists[_planet] = true;
    }
}
