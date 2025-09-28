// // // scripts/deploy.js
// // import hre from "hardhat";

// // async function main() {
// //   const Contract = await hre.ethers.getContractFactory("YourContractName");
// //   const contract = await Contract.deploy();

// //   await contract.waitForDeployment();
// //   console.log("Contract deployed to:", await contract.getAddress());
// // }

// // main().catch((error) => {
// //   console.error(error);
// //   process.exitCode = 1;
// // });

// // scripts/deploy.js
// import hre from "hardhat";

// async function main() {
//   // match exactly the contract name in your Solidity file
//   const Contract = await hre.ethers.getContractFactory("ProductTracking");
//   const contract = await Contract.deploy();

//   await contract.waitForDeployment();
//   console.log("ProductTracking deployed to:", await contract.getAddress());
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

import hre from "hardhat";

async function main() {
  const Contract = await hre.ethers.getContractFactory("ProductTracking");
  const contract = await Contract.deploy();

  await contract.waitForDeployment();
  console.log("ProductTracking deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

