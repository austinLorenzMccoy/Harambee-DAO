import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", await deployer.getAddress());

  const Factory = await ethers.getContractFactory("HarambeeSafeTrigger");
  const c = await Factory.deploy(await deployer.getAddress());
  await c.waitForDeployment();

  console.log("HarambeeSafeTrigger deployed at:", await c.getAddress());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
