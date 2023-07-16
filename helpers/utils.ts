import { time } from "@nomicfoundation/hardhat-network-helpers";

//mines block every 15 sec in duration of minutes
export const mineBlock = async (minutes: number) => {
  const blockNum = (minutes * 60) / 15;
  console.log(
    `------------ Generating ${minutes} minutes of blocks...--------------`
  );
  for (let i = 0; i < blockNum; i++) {
    await time.increase(15);
  }
};
