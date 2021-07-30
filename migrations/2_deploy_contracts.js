const Planet = artifacts.require("Planet");

module.exports = function(deployer) {
  deployer.deploy(Planet);
};
