import { useCallback, useEffect, useReducer, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Flex, SimpleGrid, useToast } from "@chakra-ui/react";
import { MintModal } from "../components/MintModal/MintModal";
import { AccountState, ActionParam, PlanetDetails } from "./App.types";
import { DAI_ABI, DAI_ADDRESS, INFURA_ID, REACT_APP_PROVIDER, NETWORK, NETWORKS } from "../constants";
import { StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import { useUserAddress } from "eth-hooks";
import {create} from "ipfs-http-client";
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
} from "../hooks";
import { formatEther, parseEther } from "@ethersproject/units";
import WalletConnectProvider from "@walletconnect/web3-provider";

const { BufferList } = require("bl");

const targetNetwork = NETWORKS.ropsten;

const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

const scaffoldEthProvider = new StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544");

const ropstenInfura = new StaticJsonRpcProvider("https://ropsten.infura.io/v3/" + INFURA_ID);

const localProviderUrl = targetNetwork.rpcUrl;

const localProviderUrlFromEnv = localProviderUrl;

const localProvider = new StaticJsonRpcProvider(localProviderUrlFromEnv);

/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "ropsten", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};


// account reducer function
function accountReducer(state: AccountState, action: ActionParam) {
  switch (action.type) {
    case "SET_BALANCE":
      return {
        ...state,
        balance: action.payload.balance,
      };
    case "SET_ACCOUNT_ADDRESS":
      return {
        ...state,
        accountAddress: action.payload.accountAddress,
      };
    default:
      return state;
  }
}

const getFromIPFS = async (hashToGet:string) => {
  for await (const query of ipfs.get(hashToGet)) {
    const file:any = query;
    console.log(file.path);
    if (!file.content) continue;
    const content = new BufferList();
    for await (const chunk of file.content) {
      content.append(chunk);
    }
    console.log(content);
    return content;
  }
};



function App() {
  const [planetDetails, setPlanetDetails] = useState<PlanetDetails | null>(null);
  const [generating, setGenerating] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [yourCollectibles, setYourCollectibles] = useState<any[]>([]);
  const toast = useToast();
  const [injectedProvider, setInjectedProvider] = useState<Web3Provider | null>(null);
  const ropstenProvider = scaffoldEthProvider && scaffoldEthProvider._network ? scaffoldEthProvider : ropstenInfura;
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const readContracts:any = useContractLoader(localProvider);
  const writeContracts = useContractLoader(userProvider);
  const address = useUserAddress(userProvider);
  const balance:any = useContractReader(readContracts, "YourCollectible", "balanceOf", [address]);
  const yourBalance = balance && balance.toNumber && balance.toNumber();
  const yourLocalBalance = useBalance(localProvider, address);

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
  }, [setInjectedProvider]);

  async function ipfsUploadHandler() {
    console.log("UPLOADING...", planetDetails);
    setSending(true);
    const result = await ipfs.add(JSON.stringify(planetDetails)); // addToIPFS(JSON.stringify(planetDetails))
    if (result && result.path) {
      return result.path;
    }
    setSending(false);
    console.log("RESULT:", result);
    return null;
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

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  useEffect(() => {
    const updateYourCollectibles = async () => {
      const collectibleUpdate = [];
      for (let tokenIndex = 0; tokenIndex < balance; tokenIndex++) {
        try {
          console.log("GEtting token index", tokenIndex);
          const tokenId = await readContracts?.YourCollectible.tokenOfOwnerByIndex(address, tokenIndex);
          console.log("tokenId", tokenId);
          const tokenURI = await readContracts?.YourCollectible.tokenURI(tokenId);
          console.log("tokenURI", tokenURI);

          const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
          console.log("ipfsHash", ipfsHash);

          const jsonManifestBuffer = await getFromIPFS(ipfsHash);

          try {
            const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
            console.log("jsonManifest", jsonManifest);
            collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: address, ...jsonManifest });
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      }
      setYourCollectibles(collectibleUpdate);
    };
    updateYourCollectibles();
  }, [address, yourBalance]);


  return (
    <>
      {address && (
        <Layout>
          {address && <p>Account: {address}</p>}
          {balance && <p>Balance: {yourLocalBalance && formatEther(yourLocalBalance)}</p>}
          {/* {accountState.account} */}
          <MintModal
            generating={generating}
            planetDetails={planetDetails}
            regenerationHandler={regenerationHandler}
            ipfsUploadHandler={ipfsUploadHandler}
            onClick={planetDetails ? () => {} : getPlanetImage}
            ensProvider={ropstenProvider}
            provider={userProvider}
            writeContracts={writeContracts}
            address={address}
          />
          <SimpleGrid
            minChildWidth="300px"
            gap="1rem"
            w="100%"
            maxW="1200px"
            p="3rem 0rem"
          >
            {
              [].map(({ imageURL }) => {
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
              })
            }
          </SimpleGrid>
        </Layout>
      )}
    </>
  );
}

export default App;