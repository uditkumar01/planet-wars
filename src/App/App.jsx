import "./App.css";
import React, { useEffect, useReducer, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { MintModal } from "../components/MintModal/MintModal";
import { useEtherBalance, useEthers } from '@usedapp/core';
import { formatEther } from "@ethersproject/units";
import { ethers } from "ethers";
import Planet from "../artifacts/contracts/Planet.sol/Planet.json";

const PlanetAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const { activateBrowserWallet,account } = useEthers()
  const etherBalance = useEtherBalance(account)
  const [planetDetails, setPlanetDetails] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [accountState, accountDispatch] = useReducer(reducer, {
    contract: null,
    totalSupply: 0,
    planets: [],
  });

  function reducer(state, action) {
    switch (action.type) {
      case "SET_ACCOUNT":
        return { ...state, account: action.payload.account };
      case "SET_CONTRACT":
        return { ...state, contract: action.payload.contract };
      case "SET_TOTAL_SUPPLY":
        return { ...state, totalSupply: action.payload.totalSupply };
      case "MINT":
        return { ...state, planets: [...state.planets, action.payload.planet] };
      default:
        return state;
    }
  }

  async function getPlanetImage() {
    setGenerating(true);
    console.log("running planet");
    try {
      // const res = await axios.get(
      //   `https://planetWars.uditkumar01.repl.co/generate`
      // );
      // const { data } = res;
      // console.log(data);
      // setPlanetDetails({
      //   imageURL: data?.imageURL,
      //   planetName: data?.planetName,
      // });
    } catch (err) {
      console.error(err);
    }
    setGenerating(false);
    return;
  }

  function regenerationHandler() {
    getPlanetImage();
  }

  async function loadBlockChainData() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(PlanetAddress, Planet.abi, provider);
      try {
        const totalSupply = parseInt(await contract.getTotalNoOfPlanets(), 10);
        const etherBalance = parseInt(await provider.getBalance(account), 10);

        // setting account address
        accountDispatch({
          type: "SET_ACCOUNT",
          payload: {
            account,
          },
        });

        // setting contract
        accountDispatch({
          type: "SET_CONTRACT",
          payload: {
            contract: contract,
          },
        });

        console.log(totalSupply, account, etherBalance);
      } catch (err) {
        console.error(
          "Error while Loading Blockchain data:\n",
          err.message,
          err
        );
      }
    }
  }

  async function mint() {}

  useEffect(() => {
    (async () => {
      await activateBrowserWallet();
      await loadBlockChainData();
    })();
  }, []);

  console.log(accountState);

  return (
    <>
      {accountState && (
        <Layout>
          {account && <p>Account: {account}</p>}
          {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
          {/* {accountState.account} */}
          <MintModal
            generating={generating}
            planetDetails={planetDetails}
            regenerationHandler={regenerationHandler}
            mint={mint}
          />
          <SimpleGrid
            minChildWidth="300px"
            gap="1rem"
            w="100%"
            maxW="1200px"
            p="3rem 0rem"
          >
            {accountState &&
              accountState?.planets.map(({ imageURL }) => {
                return (
                  <Flex justifyContent="center" minH="300px">
                    <Flex
                      bg={`url(${imageURL})`}
                      h="250px"
                      w="250px"
                      bgSize="cover"
                      bgPos="center"
                      borderRadius="50%"
                    ></Flex>
                  </Flex>
                );
              })}
          </SimpleGrid>
        </Layout>
      )}
    </>
  );
}

export default App;
