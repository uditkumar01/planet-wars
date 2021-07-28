import React, { useEffect, useReducer, useRef } from 'react';
import Web3 from 'web3'
import './App.css';
import Color from '../abis/Color.json'

function App() {

  const inputRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, {
    account: '',
    contract: null,
    totalSupply: 0,
    colors: []
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
    const networkData = Color.networks[networkId]
    if (networkData) {
      const abi = Color.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      console.log(abi)
      dispatch({ type: 'SET_CONTRACT', payload: { contract } })
      const totalSupply = await contract.methods.totalSupply().call()
      console.log(totalSupply, await contract.methods.balanceOf(accounts[0]).call());
      dispatch({ type: 'SET_TOTAL_SUPPLY', payload: { totalSupply } })
      // Load Colors
      for (var i = 1; i <= totalSupply; i++) {
        const color = await contract.methods.colors(i - 1).call()
        dispatch({
          type: 'MINT',
          payload: { color: color },
        })
      }
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  const mint = (color) => {
    console.log("step1")
    state.contract.methods.mint(color).send({ from: state.account }, function (error, transactionHash) {
      console.error(error);
      return dispatch({
        type: 'MINT',
        payload: { color: color },
      })
    })

  }


  function reducer(state, action) {
    console.log("step3")
    switch (action.type) {
      case 'SET_ACCOUNT':
        return { ...state, account: action.payload.account }
      case 'SET_CONTRACT':
        return { ...state, contract: action.payload.contract }
      case 'SET_TOTAL_SUPPLY':
        return { ...state, totalSupply: action.payload.totalSupply }
      case 'MINT':
        return { ...state, colors: [...state.colors, action.payload.color] }
      default:
        return state
    }

  }

  console.log(state);

  useEffect(() => {
    (async () => {
      await loadWeb3()
      await loadBlockchainData()
    })()
  }, []);

  return (
    <>
      {state &&
        <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
              className="navbar-brand col-sm-3 col-md-2 mr-0"
              href="http://www.dappuniversity.com/bootcamp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Color Tokens
            </a>
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-white"><span id="account">{state.account}</span></small>
              </li>
            </ul>
          </nav>
          <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                  <h1>Issue Token</h1>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const color = inputRef.current.value
                    mint(color)
                  }}>
                    <input
                      type='text'
                      className='form-control mb-1'
                      placeholder='e.g. #FFFFFF'
                      ref={inputRef}
                    />
                    <input
                      type='submit'
                      className='btn btn-block btn-primary'
                      value='MINT'
                    />
                  </form>
                </div>
              </main>
            </div>
            <hr />
            <div className="row text-center">
              {state.colors.map((color, key) => {
                return (
                  <div key={key} className="col-md-3 mb-3 d-flex" style={{ flexDirection: "column", alignItems: "center", color: "#4c4e61" }}>
                    <div className="token mb-2" style={{ backgroundColor: color, height: "200px", width: "200px", borderRadius: "50%" }}></div>
                    <div>{color}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      }
    </>
  );
}


export default App;
