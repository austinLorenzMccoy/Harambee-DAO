import { expect } from "chai";
import { ethers } from "hardhat";

describe("HarambeeSafeTrigger", function () {
  it("deploys and emits event on submitAttestation", async function () {
    const [deployer] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("HarambeeSafeTrigger");
    const c = await Factory.deploy(deployer.address);
    await c.waitForDeployment();

    const tx = await c.submitAttestation(
      "prop-123",
      true,
      9400,
      "bafy...",
      "resnet50-v1.3",
      ethers.toUtf8Bytes("sig")
    );
    const rc = await tx.wait();

    const ev = rc!.logs.find((l: any) => (l as any).fragment?.name === "AuditAttested");
    expect(ev).to.not.be.undefined;
  });
});
