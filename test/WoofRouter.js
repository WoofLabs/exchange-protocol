const { expect } = require("chai");
const { BigNumber } = require("ethers");

describe("Router contract", function () {
    it("Deploy router contrct", async function () {
        const wcoreAddress = "0x191e94fa59739e188dce837f7f6978d84727ad01"
        const woofAddress = "0x5c44d3d2312aba4d5f2406a98bf374bc76455092"
        // const networkName = network.name;
        // const provider = new ethers.providers.JsonRpcProvider("https://rpc.coredao.org");
        const [deployer] = await ethers.getSigners();

        const WoofFactory = await hre.ethers.getContractFactory("WoofFactory");
        const woofFactory = await WoofFactory.deploy(deployer.address);
        await woofFactory.deployed();
        console.log("woofFactory contract deployed to:", woofFactory.address);
        console.log("INIT_CODE_PAIR_HASH = ", await woofFactory.INIT_CODE_PAIR_HASH());

        const WoofRouter = await hre.ethers.getContractFactory("WoofRouter");
        const woofRouter = await WoofRouter.deploy(woofFactory.address, wcoreAddress, deployer.address);
        await woofRouter.deployed();
        console.log("woofRouter contract deployed to:", woofRouter.address);


        // await woofRouter.swapExactETHForTokens("0x95e20981c14c41", ["0x191E94fa59739e188dcE837F7f6978d84727AD01", "0x5C44d3D2312AbA4d5F2406A98Bf374Bc76455092"], 
        //                                         "0xb7f09C0Bf28a8068E755e737F4920B120Da5B1c0", "0x650b868b", {value: "0x2386f26fc10000"})
        
        // const wcoreArtifact = hre.artifacts.readArtifact("WCORE")
        // const wcoreAbi = (await wcoreArtifact).abi
        // const WCORE = new hre.ethers.Contract(wcoreAddress, wcoreAbi, deployer)

        // const woofArtifact = hre.artifacts.readArtifact("WOOF")
        // const woofAbi = (await woofArtifact).abi
        // const WOOF = new hre.ethers.Contract(woofAddress, woofAbi, deployer)

        // const amountWCORE = 5
        // const amountWOOF = 5

        // tx = await WCORE.approve(woofRouter.address, ethers.utils.parseUnits(String(amountWCORE), 18));
        // await tx.wait();
        // console.log('approve WCORE = ')

        // tx = await WOOF.approve(woofRouter.address, ethers.utils.parseUnits(String(amountWOOF), 18));
        // await tx.wait();
        // console.log('approve WOOF = ')

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


    });
});