# W3F Testing with Event as Trigger Type

This repo contains example of how to test web3-functions having event as trigger type

## Getting Started

### Step 1: Clone the Repository

```shell
git clone https://github.com/HiteshMittal07/W3F-Event-Testing.git
cd W3F-Event-Testing
```

### Step 2: Installing Dependencies

```shell
npm install
```

### Step 3: Copy Environment Variables

```shell
cp .env.example .env
```

### Step 4: Run the Script

Run the event listener script using the command below. Once the script is running, execute a transaction on your target contract address to trigger the event. The event listener will capture the emitted event, save the event details in `log.json`, and automatically initiate the web3-function testing process.

**Note:** Make necessary modifications to `eventListener.ts` and `index.ts` as per your requirements.

```shell
npm run test
```
