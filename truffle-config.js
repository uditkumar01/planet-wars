require('babel-register');
require('babel-polyfill');
require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider');

const MNEMONIC = process.env.MNEMONIC;
const INFURA_API_KEY = process.env.INFURA_API_KEY;
module.exports = {
  networks: {
    ropsten: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC,
          `https://ropsten.infura.io/v3/${INFURA_API_KEY}`
        )
      },
      gasPrice: 5500000,
      network_id: 3,
      confirmations: 2,
      timeOfBlock: 200,
      skipDryRun: true,
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
