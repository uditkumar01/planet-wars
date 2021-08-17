import { StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { formatEther, parseEther } from "@ethersproject/units";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useUserAddress } from "eth-hooks";
import React, { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import "./App.css";
import {
  DAI_ABI,
  DAI_ADDRESS,
  INFURA_ID,
  NETWORK,
  NETWORKS,
} from "./constants";
import { Transactor } from "./helpers";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useEventListener,
  useExchangePrice,
  useExternalContractLoader,
  useGasPrice,
  useOnBlock,
  useUserProvider,
} from "./hooks";
import { create } from "ipfs-http-client";
import {
  Box,
  Button,
  Flex,
  Image,
  Progress,
  SimpleGrid,
} from "@chakra-ui/react";
import { Layout } from "./components/Layout/Layout";
import { MintModal } from "./components/MintModal/MintModal";
import axios from "axios";
import { Navbar } from "./components/Navbar/Navbar";
import { Planet3D } from "./components/Planet3D/Planet3D";

// https://www.npmjs.com/package/ipfs-http-client

const ipfs = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});
/*
    Welcome to 🏗 scaffold-eth !

    Code:
    https://github.com/austintgriffith/scaffold-eth

    Support:
    https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA
    or DM @austingriffith on twitter or telegram

    You should get your own Infura.io ID and put it in `constants.js`
    (this is your connection to the main Ethereum network for ENS etc.)


    🌏 EXTERNAL CONTRACTS:
    You can also bring in contract artifacts in `constants.js`
    (and then use the `useExternalContractLoader()` hook!)
*/

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.ropsten; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = true;

// helper function to "Get" from IPFS
// you usually go content.toString() after this...
// const getFromIPFS = async (hashToGet) => {
//   for await (const file of ipfs.get(hashToGet)) {
//     console.log(file.path);
//     if (!file.content) continue;
//     const content = new BufferList();
//     for await (const chunk of file.content) {
//       content.append(chunk);
//     }
//     console.log(content);
//     return content;
//   }
// };

// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// const mainnetProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// const mainnetProvider = new InfuraProvider("mainnet",INFURA_ID);
//
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
// Using StaticJsonRpcProvider as the chainId won't change see https://github.com/ethers-io/ethers.js/issues/901
const scaffoldEthProvider = new StaticJsonRpcProvider(
  "https://rpc.scaffoldeth.io:48544"
);
const mainnetInfura = new StaticJsonRpcProvider(
  "https://mainnet.infura.io/v3/" + INFURA_ID
);
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_I

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER
  ? process.env.REACT_APP_PROVIDER
  : localProviderUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = new StaticJsonRpcProvider(localProviderUrlFromEnv);

// 🔭 block explorer URL
const blockExplorer = targetNetwork.blockExplorer;

/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
  theme: {
    background: "#2d3748",
    main: "rgb(199, 199, 199)",
    secondary: "rgb(136, 136, 136)",
    border: "rgba(195, 195, 195, 0.14)",
    hover: "rgb(16, 26, 32)",
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

function App(props) {
  const mainnetProvider =
    scaffoldEthProvider && scaffoldEthProvider._network
      ? scaffoldEthProvider
      : mainnetInfura;

  const [injectedProvider, setInjectedProvider] = useState();
  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangePrice(targetNetwork, mainnetProvider);

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");
  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const address = useUserAddress(userProvider);

  // You can warn the user if you would like them to be on a specific network
  const localChainId =
    localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId =
    userProvider && userProvider._network && userProvider._network.chainId;

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userProvider, gasPrice);

  // Faucet Tx can be used to send funds from the faucet
  const faucetTx = Transactor(localProvider, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address);

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address);

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider);

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  const writeContracts = useContractLoader(userProvider);

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  const mainnetDAIContract = useExternalContractLoader(
    mainnetProvider,
    DAI_ADDRESS,
    DAI_ABI
  );

  // If you want to call a function on a new block
  // useOnBlock(mainnetProvider, () => {
  //   console.log(
  //     `⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`
  //   );
  // });

  // Then read your DAI balance like:
  const myMainnetDAIBalance = useContractReader(
    { DAI: mainnetDAIContract },
    "DAI",
    "balanceOf",
    ["0x34aA3F359A9D614239015126635CE7732c18fDF3"]
  );

  // keep track of a variable from the contract in the local React state:
  const balance = useContractReader(
    readContracts,
    "YourCollectible",
    "balanceOf",
    [address]
  );
  // console.log("🤗 balance:", balance);
  // 📟 Listen for broadcast events
  const transferEvents = useEventListener(
    readContracts,
    "YourCollectible",
    "Transfer",
    localProvider,
    1
  );
  // console.log("📟 Transfer events:", transferEvents);

  //
  // 🧠 This effect will update yourCollectibles by polling when your balance changes
  //
  const yourBalance = balance && balance.toNumber && balance.toNumber();
  const [yourCollectibles, setYourCollectibles] = useState();
  const [totalNoOfNfts, setTotalNoOfNfts] = useState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      const tot = await readContracts?.YourCollectible?.totalSupply();
      if (tot !== totalNoOfNfts) {
        console.log("new planet minted");
        setTotalNoOfNfts(tot);
      }
    })();
  }, [address, yourBalance]);

  useEffect(() => {
    const updateYourCollectibles = async () => {
      const collectibleUpdate = [];
      console.log("UPDATING...");
      for (let tokenIndex = 65; tokenIndex < totalNoOfNfts; tokenIndex++) {
        try {
          // console.log(
          //   "Getting token index",
          //   tokenIndex,
          //   balance.toString(),
          //   tot.toString()
          // );
          const tokenId = await readContracts.YourCollectible.tokenByIndex(
            tokenIndex
          );
          console.log(tokenIndex);
          const tokenURI = await readContracts.YourCollectible.tokenURI(
            tokenId
          );
          // console.log("tokenURI", tokenURI);

          const resfromURI = await axios.get(tokenURI);

          if (
            resfromURI?.data &&
            resfromURI.data?.symbol === "PWS" &&
            !collectibleUpdate.some(
              (col) => col.imageURL === resfromURI.data.imageURL
            )
          ) {
            console.log(tokenIndex, "PLANETS INDEX");
            collectibleUpdate.push(resfromURI.data);
          }

          if (collectibleUpdate.length % 4 === 0) {
            setYourCollectibles([...collectibleUpdate]);
          }
          if (yourCollectibles.length <= 0) {
            setProgress((tokenIndex / totalNoOfNfts) * 100);
          }
        } catch (e) {
          console.log(e);
        }
      }
      setYourCollectibles(collectibleUpdate);
    };
    updateYourCollectibles();
  }, [totalNoOfNfts]);

  /*
  const addressFromENS = useResolveName(mainnetProvider, "austingriffith.eth");
  console.log("🏷 Resolved austingriffith.eth as:",addressFromENS)
  */

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  // useEffect(() => {
  //   if (
  //     DEBUG &&
  //     mainnetProvider &&
  //     address &&
  //     selectedChainId &&
  //     yourLocalBalance &&
  //     yourMainnetBalance &&
  //     readContracts &&
  //     writeContracts &&
  //     mainnetDAIContract
  //   ) {
  //     console.log(
  //       "_____________________________________ 🏗 scaffold-eth _____________________________________"
  //     );
  //     console.log("🌎 mainnetProvider", mainnetProvider);
  //     console.log("🏠 localChainId", localChainId);
  //     console.log("👩‍💼 selected address:", address);
  //     console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
  //     console.log(
  //       "💵 yourLocalBalance",
  //       yourLocalBalance ? formatEther(yourLocalBalance) : "..."
  //     );
  //     console.log(
  //       "💵 yourMainnetBalance",
  //       yourMainnetBalance ? formatEther(yourMainnetBalance) : "..."
  //     );
  //     console.log("📝 readContracts", readContracts);
  //     console.log("🌍 DAI contract on mainnet:", mainnetDAIContract);
  //     console.log("🔐 writeContracts", writeContracts);
  //   }
  // }, [
  //   mainnetProvider,
  //   address,
  //   selectedChainId,
  //   yourLocalBalance,
  //   yourMainnetBalance,
  //   readContracts,
  //   writeContracts,
  //   mainnetDAIContract,ute, setRoute] = useState();
  // useEffect(() => {
  //   setRoute(window.location.pathname);
  // }, [setRoute]);
  // ]);

  // let networkDisplay = "";
  // if (localChainId && selectedChainId && localChainId !== selectedChainId) {
  //   const networkSelected = NETWORK(selectedChainId);
  //   const networkLocal = NETWORK(localChainId);
  //   if (selectedChainId === 1337 && localChainId === 31337) {
  //     networkDisplay = (
  //       <div
  //         style={{
  //           zIndex: 2,
  //           position: "absolute",
  //           right: 0,
  //           top: 60,
  //           padding: 16,
  //         }}
  //       >
  //         <Alert
  //           message="⚠️ Wrong Network ID"
  //           description={
  //             <div>
  //               You have <b>chain id 1337</b> for localhost and you need to
  //               change it to <b>31337</b> to work with HardHat.
  //               <div>
  //                 (MetaMask -&gt; Settings -&gt; Networks -&gt; Chain ID -&gt;
  //                 31337)
  //               </div>
  //             </div>
  //           }
  //           type="error"
  //           closable={false}
  //         />
  //       </div>
  //     );
  //   } else {
  //     networkDisplay = (
  //       <div
  //         style={{
  //           zIndex: 2,
  //           position: "absolute",
  //           right: 0,
  //           top: 60,
  //           padding: 16,
  //         }}
  //       >
  //         <Alert
  //           message="⚠️ Wrong Network"
  //           description={
  //             <div>
  //               You have <b>{networkSelected && networkSelected.name}</b>{" "}
  //               selected and you need to be on{" "}
  //               <b>{networkLocal && networkLocal.name}</b>.
  //             </div>
  //           }
  //           type="error"
  //           closable={false}
  //         />
  //       </div>
  //     );
  //   }
  // } else {
  //   networkDisplay = (
  //     <div
  //       style={{
  //         zIndex: -1,
  //         position: "absolute",
  //         right: 154,
  //         top: 28,
  //         padding: 16,
  //         color: targetNetwork.color,
  //       }}
  //     >
  //       {targetNetwork.name}
  //     </div>
  //   );
  // }

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  // const [route, setRoute] = useState();
  // useEffect(() => {
  //   setRoute(window.location.pathname);
  // }, [setRoute]);

  // let faucetHint = "";
  // const faucetAvailable =
  //   localProvider &&
  //   localProvider.connection &&
  //   targetNetwork.name == "localhost";

  // const [faucetClicked, setFaucetClicked] = useState(false);
  // if (
  //   !faucetClicked &&
  //   localProvider &&
  //   localProvider._network &&
  //   localProvider._network.chainId == 31337 &&
  //   yourLocalBalance &&
  //   formatEther(yourLocalBalance) <= 0
  // ) {
  //   faucetHint = (
  //     <div style={{ padding: 16 }}>
  //       <Button
  //         type="primary"
  //         onClick={() => {
  //           faucetTx({
  //             to: address,
  //             value: parseEther("0.01"),
  //           });
  //           setFaucetClicked(true);
  //         }}
  //       >
  //         💰 Grab funds from the faucet ⛽️
  //       </Button>
  //     </div>
  //   );
  // }

  const [planetDetails, setPlanetDetails] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function ipfsUploadHandler() {
    console.log("UPLOADING...", planetDetails);
    setUploading(true);
    const result = await ipfs.add(JSON.stringify(planetDetails)); // addToIPFS(JSON.stringify(planetDetails))
    if (result && result.path) {
      return result.path;
    }
    setUploading(false);
    console.log("RESULT:", result);
    return null;
  }

  async function getPlanetImage() {
    setGenerating(true);
    console.log("running planet");
    try {
      const res = await axios.get(
        `https://planetWars.uditkumar01.repl.co/generate`
      );
      const { data } = res;
      console.log(data);
      setPlanetDetails({
        imageURL: data?.imageURL,
        planetName: data?.planetName,
        properties: data?.properties,
        symbol: data?.symbol,
      });
    } catch (err) {
      console.error(err);
    }
    setGenerating(false);
    return;
  }

  function regenerationHandler() {
    getPlanetImage();
  }

  // console.log({ yourCollectibles });

  return (
    <div className="App">
      <>
        {address && (
          <Layout>
            <Navbar
              address={address}
              yourBalance={yourLocalBalance && formatEther(yourLocalBalance)}
              web3Modal={web3Modal}
              loadWeb3Modal={loadWeb3Modal}
              logoutOfWeb3Modal={logoutOfWeb3Modal}
            />
            {/* {accountState.account} */}
            {yourCollectibles?.length > 0 ? (
              <>
                <MintModal
                  generating={generating}
                  planetDetails={planetDetails}
                  regenerationHandler={regenerationHandler}
                  ipfsUploadHandler={ipfsUploadHandler}
                  onClick={planetDetails ? () => {} : getPlanetImage}
                  writeContracts={writeContracts}
                  address={address}
                  uploading={uploading}
                />
                <SimpleGrid
                  minChildWidth="300px"
                  gap="1rem"
                  w="100%"
                  maxW="1200px"
                  p="1rem 0rem"
                >
                  {yourCollectibles.map(({ symbol, imageURL }) => {
                    return (
                      <Flex key={imageURL} justifyContent="center" minH="300px">
                        {/* <Flex
                        bg={`url(${imageURL})`}
                        h="250px"
                        w="250px"
                        bgSize="cover"
                        bgPos="center"
                        borderRadius="50%"
                      ></Flex> */}
                        <Planet3D scale={2} planetLink={imageURL} />
                      </Flex>
                    );
                  })}
                </SimpleGrid>
              </>
            ) : (
              <>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  flexDir="column"
                  bg="black.1000"
                  w="100vw"
                  h="100vh"
                  pos="absolute"
                  top="0"
                  left="0"
                >
                  <Image src="/images/loader2.gif" w="92vw" maxW="300px" />
                  <Box mt="2rem" w="90vw" maxW="400px" maxW="300px">
                    <Progress hasStripe={true} isAnimated={true} value={progress} size="xs" colorScheme="teal" />
                  </Box>
                </Flex>
              </>
            )}
          </Layout>
        )}
      </>
    </div>
  );
}

/* eslint-disable */
window.ethereum &&
  window.ethereum.on("chainChanged", (chainId) => {
    web3Modal.cachedProvider &&
      setTimeout(() => {
        window.location.reload();
      }, 1);
  });

window.ethereum &&
  window.ethereum.on("accountsChanged", (accounts) => {
    web3Modal.cachedProvider &&
      setTimeout(() => {
        window.location.reload();
      }, 1);
  });
/* eslint-enable */

export default App;
