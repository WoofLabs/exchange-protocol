// import { ethers, network, run } from "hardhat";
// import config from "../config";
const { ethers, network, run } = require("hardhat")
const config = require("../config")

const main = async () => {
  // Compile contracts
  await run("compile");
  console.log("Compiled contracts.");

  const networkName = network.name;
  const [deployer] = await ethers.getSigners();

  // Sanity checks
  if (networkName === "mainnet") {
    if (!process.env.KEY_MAINNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
  } else if (networkName === "testnet") {
    if (!process.env.KEY_TESTNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
  }

  if (!config.WoofRouter[networkName] || config.WoofRouter[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing router address, refer to README 'Deployment' section");
  }

  if (!config.WCORE[networkName] || config.WCORE[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing WCORE address, refer to README 'Deployment' section");
  }

  console.log("Deploying to network:", networkName);

  // Deploy WoofZap
  console.log("Deploying WoofZap V1..");

  const WoofZap = await ethers.getContractFactory("WoofZap");

  const woofZap = await WoofZap.deploy(
    config.WCORE[networkName],
    config.WoofRouter[networkName],
    config.MaxZapReverseRatio[networkName]
  );

  await woofZap.deployed();

  console.log("woofZap V1 deployed to:", woofZap.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
