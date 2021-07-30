import React, { useEffect, useReducer, useState } from 'react';
import Web3 from 'web3'
import './App.css';
import Planet from '../abis/Planet.json'
import { Layout } from "../components/Layout/Layout";
import { Flex, SimpleGrid, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { MintModal } from '../components/MintModal/MintModal';

function App() {

  const [planetDetails, setPlanetDetails] = useState(null);
  const [generating, setGenerating] = useState(false);
  const { onClose } = useDisclosure();
  const toast = useToast()
  const [state, dispatch] = useReducer(reducer, {
    account: '',
    contract: null,
    totalSupply: 0,
    planets: []
  });

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    dispatch({ type: 'SET_ACCOUNT', payload: { account: accounts[0] } })

    const networkId = await web3.eth.net.getId()
    const networkData = Planet.networks[networkId]
    if (networkData) {
      const abi = Planet.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      console.log(abi)
      dispatch({ type: 'SET_CONTRACT', payload: { contract } })
      const totalSupply = await contract.methods.totalSupply().call()
      console.log(totalSupply, await contract.methods.balanceOf(accounts[0]).call());
      dispatch({ type: 'SET_TOTAL_SUPPLY', payload: { totalSupply } })
      // Load Planets
      for (var i = 1; i <= totalSupply; i++) {
        const planet = await contract.methods.planets(i - 1).call()
        dispatch({
          type: 'MINT',
          payload: { planet: JSON.parse(planet) },
        })
      }
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  const mint = () => {
    const mintingData = { ...planetDetails };
    state.contract.methods.mint(JSON.stringify(mintingData)).send({ from: state.account }, function (error, transactionHash) {
      console.error(error);
      dispatch({
        type: 'MINT',
        payload: { planet: mintingData },
      })
      toast({
        title: `Minted Successfully!!`,
        description: `We've minted ${planetDetails?.planetName.split("-").join(" ")} for you.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      })
      onClose();
    })

  }


  function reducer(state, action) {
    switch (action.type) {
      case 'SET_ACCOUNT':
        return { ...state, account: action.payload.account }
      case 'SET_CONTRACT':
        return { ...state, contract: action.payload.contract }
      case 'SET_TOTAL_SUPPLY':
        return { ...state, totalSupply: action.payload.totalSupply }
      case 'MINT':
        return { ...state, planets: [...state.planets, action.payload.planet] }
      default:
        return state
    }

  }


  // make a call to server to get planet image details
  async function getPlanetImage() {
    setGenerating(true);
    console.log("running planet");
    try {
      const res = await axios.get(
        `https://planetWars.uditkumar01.repl.co/generate`
      );
      const { data } = res;
      console.log(data);
      setPlanetDetails({ imageURL: data?.imageURL, planetName: data?.planetName });
    } catch (err) {
      console.error(err);
    }
    setGenerating(false);
    return;
  }

  function regenerationHandler() {
    getPlanetImage();
  }

  useEffect(() => {
    if (!planetDetails) {
      getPlanetImage();
    }
  }, []);

  // console.log(state);

  useEffect(() => {
    (async () => {
      await loadWeb3()
      await loadBlockchainData()
    })()
  }, []);

  console.log(state);

  return (
    <>
      {state &&
        <Layout>
          {/* {state.account} */}
          <MintModal generating={generating} planetDetails={planetDetails} regenerationHandler={regenerationHandler} mint={mint} />
          <SimpleGrid minChildWidth="300px" gap="1rem" w="100%" maxW="1200px" p="3rem 0rem">
            {state && state?.planets.map(({ imageURL }) => {
              return (
                <Flex justifyContent="center" minH="300px">
                  <Flex bg={`url(${imageURL})`} h="250px" w="250px" bgSize="cover" bgPos="center" borderRadius="50%">

                  </Flex>
                </Flex>
              );
            })}
          </SimpleGrid>
        </Layout>
      }
    </>
  );
}


export default App;
