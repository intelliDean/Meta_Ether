# Meta_Bank
This is a simple decentralized application (DApp) for banking. Users can deposit, check their balance, and withdraw funds. Additionally, the DApp provides a feature to track users' deposits and withdrawals.

## Description
This is a simple Solidity smart contract comprising five functions: three user-defined functions and two automatically generated functions.

The three user-defined functions are:

- deposit(uint256 _amount): Allows users to deposit a specified amount into the contract.
- checkBalance(): Allows users to check their balance within the contract.
- withdraw(uint256 _withdrawAmount): Enables users to withdraw their deposits from the contract. However, withdrawal is only permitted if a deposit has been made.
The two automatically generated functions are:

- noOfDeposit(): Indicates the number of deposits made by the user into the contract.
- noOfWithdraw(): Indicates the number of withdrawals made by the user from the contract.
All of these functions and their associated values are visible and accessible to the frontend (client) for easy interaction.


## Getting Started
Executing program
After cloning the github, you will want to do the following to get the code running on your computer.

Inside the project directory, in the terminal type: npm i
Open two additional terminals in your VS code
In the second terminal type: npx hardhat node
In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js (I would personally suggest to run the command npx node deploy and replace the new contract address gotten with the one in the index.js file before running the above)
Back in the first terminal, type npm run dev to launch the front-end. After this, the project will be running on your localhost. Typically at http://localhost:3000/

## Authors
MIchael Dean Oyewole

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
