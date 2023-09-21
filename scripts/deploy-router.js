const hre = require("hardhat");
const config = require("../config")
const { ethers, network, run } = require("hardhat")

async function main() {
    const wcoreAddress = "0x191e94fa59739e188dce837f7f6978d84727ad01"
    const woofAddress = "0x5c44d3d2312aba4d5f2406a98bf374bc76455092"
    // const networkName = network.name;
    // const provider = new ethers.providers.JsonRpcProvider("https://rpc.coredao.org");
    const [deployer] = await ethers.getSigners();

    const WoofFactory = await hre.ethers.getContractFactory("WoofFactory");
    const woofFactory = await WoofFactory.deploy(deployer.address);
    await woofFactory.deployed();
    console.log("woofFactory contract deployed to:", woofFactory.address);
    // console.log("INIT_CODE_PAIR_HASH = ", await woofFactory.INIT_CODE_PAIR_HASH());

    const WoofRouter = await hre.ethers.getContractFactory("WoofRouter");
    const woofRouter = await WoofRouter.deploy(woofFactory.address, wcoreAddress, deployer.address);
    await woofRouter.deployed();
    console.log("woofRouter contract deployed to:", woofRouter.address);

    const wcoreArtifact = hre.artifacts.readArtifact("WCORE")
    const wcoreAbi = (await wcoreArtifact).abi
    const WCORE = new hre.ethers.Contract(wcoreAddress, wcoreAbi, deployer)

    const woofArtifact = hre.artifacts.readArtifact("WOOF")
    const woofAbi = (await woofArtifact).abi
    const WOOF = new hre.ethers.Contract(woofAddress, woofAbi, deployer)

    const amountWCORE = 3
    const amountWOOF = 3

    tx = await WCORE.approve(woofRouter.address, ethers.utils.parseUnits(String(amountWCORE), 18));
    await tx.wait();
    console.log('approve WCORE!')

    tx = await WOOF.approve(woofRouter.address, ethers.utils.parseUnits(String(amountWOOF), 18));
    await tx.wait();
    console.log('approve WOOF!')

    // tx = await woofRouter.addLiquidity(
    //     wcoreAddress,
    //     woofAddress,
    //     ethers.utils.parseUnits(String(amountWCORE), 18),
    //     ethers.utils.parseUnits(String(amountWOOF), 18),
    //     0,
    //     0,
    //     deployer.address,
    //     "111111111111111111111"
    // );
    // await tx.wait();
    // console.log('add liquidity')

    // const woofLP = await woofFactory.getPair(wcoreAddress, woofAddress)
    // console.log('woof LP = ', woofLP)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});