import {useEffect, useState} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
    const [ethWallet, setEthWallet] = useState(undefined);
    const [account, setAccount] = useState(undefined);
    const [atm, setATM] = useState(undefined);
    const [balance, setBalance] = useState(undefined);
    const [depositTx, setDepositTx] = useState(undefined);
    const [withdrawTx, setWithdrawTx] = useState(undefined);

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const atmABI = atm_abi.abi;

    const getWallet = async () => {
        if (window.ethereum) {
            setEthWallet(window.ethereum);
        }

        if (ethWallet) {
            const account = await ethWallet.request({method: "eth_accounts"});
            handleAccount(account);
        }
    }

    const handleAccount = (account) => {
        if (account) {
            console.log("Account connected: ", account);
            setAccount(account);
        } else {
            console.log("No account found");
        }
    }

    const connectAccount = async () => {
        if (!ethWallet) {
            alert('MetaMask wallet is required to connect');
            return;
        }

        const accounts = await ethWallet.request({method: 'eth_requestAccounts'});
        handleAccount(accounts);

        // once wallet is set we can get a reference to our deployed contract
        getATMContract();
    };

    const getATMContract = () => {
        const provider = new ethers.providers.Web3Provider(ethWallet);
        const signer = provider.getSigner();
        const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

        setATM(atmContract);
    }

    const getBalance = async () => {
        if (atm) {
            setBalance((await atm.getBalance()).toNumber());
        }
    }


    const getDepositTx = async () => {
        if (atm) {
            setDepositTx((await atm.noOfDeposit()).toNumber());
        }
    }

    const getWithdrawTx = async () => {
        if (atm) {
            setWithdrawTx((await atm.noOfWithdraw()).toNumber());
        }
    }

    const deposit = async () => {
        if (atm) {
            let tx = await atm.deposit(1);
            await tx.wait()
            getBalance().then(() => {
            });
            getDepositTx().then(() => {
            });
        }
    }

    const withdraw = async () => {
        if (atm) {
            if (balance > 0) {
                let tx = await atm.withdraw(1);
                await tx.wait()
                getBalance().then(() => {
                });
                getWithdrawTx().then(() => {
                });
            }
        }
    }


    const initUser = () => {
        // Check to see if user has Metamask
        if (!ethWallet) {
            return <p>Please install Metamask in order to use this ATM.</p>
        }

        // Check to see if user is connected. If not, connect to their account
        if (!account) {
            return <button  style={{ cursor: 'pointer' }} onClick={connectAccount}>Please connect your Metamask wallet</button>
        }

        if (balance === undefined) {

            getBalance().then(() => {
            });
        }

        return (
            <div>
                <p>Your Account: {account}</p>
                <p>Your Balance: {balance}</p>
                <p>Number of Deposit: {depositTx}</p>
                <p>Number of Withdrawal: {withdrawTx}</p>
                <button onClick={deposit}>Deposit 1 ETH</button>
                <button onClick={withdraw}>Withdraw 1 ETH</button>

                <style jsx>{`

                  .container {
                    padding: 20px;
                    border: 1px solid rgba(0, 0, 0, .2);
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    max-width: 800px;
                  }

                  p {
                    font-size: 20px;
                    font-weight: 500;
                  }

                  button {
                    padding: 20px;
                    margin-bottom: 20px;
                    cursor: pointer;
                  }
                `}</style>
            </div>
        )
    }

    useEffect(() => {
        getWallet();
    }, []);

    return (
        <main className="container">
            <header><h1>Welcome to the Metacrafters ATM!</h1></header>
            {initUser()}
            <style jsx>{`
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                text-align: center;
              }

              body {
                display: flex;
                align-items: center;
                text-align: center;
              }
            `}
            </style>
        </main>
    )
}
