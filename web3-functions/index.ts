import {
  Web3Function,
  Web3FunctionEventContext,
} from "@gelatonetwork/web3-functions-sdk";
import { ethers } from "ethers";

const SIMPLE_COUNTER_ABI = [
  "function increment()",
  "event IncrementCounter(uint256, address)",
];

Web3Function.onRun(async (context: Web3FunctionEventContext) => {
  const { userArgs, multiChainProvider, log } = context;

  const provider: any = multiChainProvider.default();
  const counterAddress =
    (userArgs.counter as string) ??
    "0xEEeBe2F778AA186e88dCf2FEb8f8231565769C27";
  console.log(counterAddress);
  let counterContract = new ethers.Contract(
    counterAddress,
    SIMPLE_COUNTER_ABI,
    provider
  );
  const event = counterContract.interface.parseLog(log);

  console.log(event);
  // Return execution call data
  return {
    canExec: true,
    callData: [],
  };
});
