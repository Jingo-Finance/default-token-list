const { version } = require("../package.json");
const rollux = require("./tokens/rollux.json");
const rollux_tanenbaum = require("./tokens/rollux-tanenbaum.json");
const zksys_tanenbaum = require("./tokens/zksys-tanenbaum.json");

const bridgeUtils = require("@uniswap/token-list-bridge-utils");

module.exports = function buildList() {
  const parsed = version.split(".");
  const l1List = {
    name: "Pegasys Default",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI:
      "https://raw.githubusercontent.com/pegasys-fi/default-token-list/master/src/logos/default.png",
    keywords: ["pegasys", "default"],
    tokens: [...rollux, ...rollux_tanenbaum, ...zksys_tanenbaum]
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      }),
  };
  return bridgeUtils.chainify(l1List);
};
