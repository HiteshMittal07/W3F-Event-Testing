import { exec } from "child_process";
import { ethers } from "ethers";
import * as fs from "fs";
import * as path from "path"; // Load environment variables

// Define RPC provider
const provider = new ethers.JsonRpcProvider("Your RPC URL");

// Contract address and ABI (Replace with your values)
const contractAddress = "0xEEeBe2F778AA186e88dCf2FEb8f8231565769C27";
const chainId = "11155111"; //replace with your chain ID
const SIMPLE_COUNTER_ABI = [
  "function increment()",
  "event IncrementCounter(uint256, address)",
];

// Create contract instance
const contract = new ethers.Contract(
  contractAddress,
  SIMPLE_COUNTER_ABI,
  provider
);

const logFilePath = path.join(__dirname, "log.json");

// Listen for Transfer events
contract.on("IncrementCounter", (newCounterValue, msgSender, event) => {
  console.log(
    `Event Received - Counter: ${newCounterValue}, Sender: ${msgSender}`
  );
  // Create log object
  const logData = {
    transactionIndex: event.log.transactionIndex,
    blockNumber: event.log.blockNumber,
    transactionHash: event.log.transactionHash,
    address: event.log.address,
    topics: event.log.topics,
    data: event.log.data,
    logIndex: event.log.index,
    blockHash: event.log.blockHash,
  };

  // Overwrite log.json with the latest event data
  fs.writeFileSync(logFilePath, JSON.stringify(logData, null, 2));

  console.log("log.json updated with latest event.");

  exec(
    `npx w3f test web3-functions/index.ts --logs --chain-id=${chainId}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        process.exit(1); // Exit with failure
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        process.exit(1); // Exit with failure
      }
      console.log(`stdout: ${stdout}`);
      process.exit(0); // Exit successfully
    }
  );
});

// Keep script running
console.log("Listening for Transfer events...");
