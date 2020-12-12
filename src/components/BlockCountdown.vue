<template>
  <div>
    <h1>Latest</h1>
    <div>Block Number: {{ currentBlock }}</div>
    <div>
      Block Time: {{ currentTimeStr }}
      <span v-if="isTimeLoading" class="note">(refreshing time)</span>
    </div>
    <div>
      Now - latest block time: {{ deltaFromNow }} seconds
      <span>
        ({{ averageTimeGap }} average delta when a new block appears)
      </span>
    </div>
    <div>
      Time gap between blocks: {{ deltaFromPrevious }} seconds
      <span> ({{ averageDeltaFromPrevious }} average) </span>
    </div>
    <h1>Test Countdown</h1>
    Target time: {{ targetTimeStr }}
    <div>
      Target block: {{ targetBlock }} (assumes 13 seconds between blocks)
    </div>
    <h2>Block countdown</h2>
    <div>{{ blocksRemaining }} (~{{ estTimeRemaining }} seconds)</div>
    <h2>Time countdown</h2>
    <div>
      {{ timeRemaining }}
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";

function toDateString(timestamp) {
  return new Date(timestamp * 1000).toLocaleString();
}

export default {
  name: "BlockCountdown",
  data: function () {
    return {
      currentBlock: "Loading...",
      currentTime: 0,
      currentTimeStr: "Loading...",
      isTimeLoading: false,
      deltaFromNow: "TBD",
      deltaFromPrevious: "TBD",
      totalDeltaFromPrevious: 0,
      totalTimeGap: 0,
      deltaCountTracked: 0,
      averageDeltaFromPrevious: "TBD",
      averageTimeGap: "TBD",
      targetTime: 1609459200,
      targetTimeStr: "TBD",
      targetBlock: "TBD",
      blocksRemaining: "TBD",
      estTimeRemaining: "TBD",
      timeRemaining: "TBD",
      timeOfLastValidBlock: "TBD",
    };
  },
  mounted: function () {
    this.readBlocks();
    setInterval(this.calcDeltaFromNow, 1000);
    this.updateTarget();
    this.targetTimeStr = toDateString(this.targetTime);
  },
  methods: {
    readBlocks: async function () {
      const provider = new ethers.providers.WebSocketProvider(
        "wss://mainnet.infura.io/ws/v3/45bd5197d3244dbaaa020750fd32efda"
      );
      const block = await provider.getBlock("latest");
      this.currentBlock = block.number;
      this.updateTime(block.timestamp);
      provider.on("block", async (blockNumber) => {
        this.currentBlock = blockNumber;
        this.isTimeLoading = true;
        const block = await provider.getBlock(blockNumber);
        this.updateTime(block.timestamp);
      });
    },
    updateTime: function (time) {
      if (this.currentTime) {
        this.deltaCountTracked++;
        const delta = time - this.currentTime;
        this.totalDeltaFromPrevious += delta;
        this.averageDeltaFromPrevious = Math.round(
          this.totalDeltaFromPrevious / this.deltaCountTracked,
          2
        );
        this.deltaFromPrevious = delta;
        const timeGap = Math.round(Date.now() / 1000) - time;
        this.totalTimeGap += timeGap;
        this.averageTimeGap = Math.round(
          this.totalTimeGap / this.deltaCountTracked,
          2
        );
      }
      this.currentTime = time;
      this.currentTimeStr = toDateString(time);
      this.isTimeLoading = false;
      this.calcDeltaFromNow();
    },
    calcDeltaFromNow: function () {
      const delta = Math.round(Date.now() / 1000) - this.currentTime;
      this.deltaFromNow = delta;

      if (
        Number.isInteger(this.currentBlock) &&
        Number.isInteger(this.targetBlock)
      ) {
        this.blocksRemaining = this.targetBlock - this.currentBlock;
        const deltaTime = Math.round(Date.now() / 1000) - this.currentTime;
        this.estTimeRemaining = this.blocksRemaining * 13 - deltaTime;
        this.timeRemaining = this.targetTime - Math.round(Date.now() / 1000);
      }
    },
    updateTarget: function () {
      if (!Number.isInteger(this.currentBlock)) {
        return setTimeout(this.updateTarget, 1000);
      }
      const delta = this.targetTime - Math.round(Date.now() / 1000);
      const deltaBlocks = Math.round(delta / 13);
      this.targetBlock = this.currentBlock + deltaBlocks;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.note {
  font-size: 0.5em;
  color: grey;
}
</style>
