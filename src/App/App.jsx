import "./App.css";
import React, { useEffect, useReducer, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import {
  Flex,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { MintModal } from "../components/MintModal/MintModal";
import { ethers } from "ethers";
import Planet from "../artifacts/contracts/Planet.sol/Planet.json";
import axios from "axios";

const PlanetAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [planetDetails, setPlanetDetails] = useState(null);
  const [generating, setGenerating] = useState(false);
  const toast = useToast();
  const [accountState, accountDispatch] = useReducer(reducer, {
    account: null,
    balance: 0,
    contract: null,
    planets: [],
  });
  const { account, balance, contract } = accountState;

  async function activateBrowserWallet() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return account[0];
  }

  function reducer(state, action) {
    switch (action.type) {
      case "SET_ACCOUNT":
        return { ...state, account: action.payload.account };
      case "SET_BALANCE":
        return { ...state, balance: action.payload.balance };
      case "SET_CONTRACT":
        return { ...state, contract: action.payload.contract };
      case "SET_TOTAL_SUPPLY":
        return { ...state, totalSupply: action.payload.totalSupply };
      case "SET_PLANETS":
        return { ...state, planets: action.payload.planets };
      case "MINT":
        return {
          ...state,
          planets: [...state.planets, ...action.payload.planet],
        };
      default:
        return state;
    }
  }

  async function getPlanetImage() {
    setGenerating(true);
    console.log("running planet");
    // try {
    //   const res = await axios.get(
    //     `https://planetWars.uditkumar01.repl.co/generate`
    //   );
    //   const { data } = res;
    //   console.log(data);
    //   setPlanetDetails({
    //     imageURL: data?.imageURL,
    //     planetName: data?.planetName,
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
    setGenerating(false);
    return;
  }

  function regenerationHandler() {
    getPlanetImage();
  }

  async function loadBlockChainData(account) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(PlanetAddress, Planet.abi, provider);
      try {
        const totalSupply = parseInt(await contract.getTotalNoOfPlanets(), 10);
        const etherBalance = ethers.utils.formatEther(
          await provider.getBalance(account),
          10
        );

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

        // setting balance
        accountDispatch({
          type: "SET_BALANCE",
          payload: {
            balance: etherBalance,
          },
        });

        // get all planets
        const planets = await contract.getListOfPlanets();

        // setting total supply
        accountDispatch({
          type: "SET_TOTAL_SUPPLY",
          payload: {
            totalSupply: planets.length,
          },
        });

        // setting planets
        accountDispatch({
          type: "SET_PLANETS",
          payload: {
            planets,
          },
        });

        console.log(totalSupply, account, etherBalance, planets);
      } catch (err) {
        console.error(
          "Error while Loading Blockchain data:\n",
          err.message,
          err
        );
      }
    }
  }

  async function mint() {
    try {
      const mintingData = { ...planetDetails };
      await contract.mint(JSON.stringify(mintingData));
      accountDispatch({
        type: "MINT",
        payload: { planet: mintingData },
      });
      toast({
        title: `Minted Successfully!!`,
        description: `We've minted ${planetDetails?.planetName
          .split("-")
          .join(" ")} for you.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Error while Minting:\n", err.message, err);
    }
  }

  useEffect(() => {
    (async () => {
      (async () => {
        const account = await activateBrowserWallet();
        await loadBlockChainData(account);
      })();
    })();
  }, []);

  // console.log(accountState);

  return (
    <>
      {accountState && (
        <Layout>
          {account && <p>Account: {account}</p>}
          {balance && <p>Balance: {balance}</p>}
          {/* {accountState.account} */}
          <MintModal
            generating={generating}
            planetDetails={planetDetails}
            regenerationHandler={regenerationHandler}
            mint={mint}
            onClick={planetDetails ? () => {} : getPlanetImage}
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
