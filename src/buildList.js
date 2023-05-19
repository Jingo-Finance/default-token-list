const { version } = require("../package.json");
const rollux = require("./tokens/rollux.json");
const rollux_tanenbaum = require("./tokens/rollux-tanenbaum.json");


const bridgeUtils = require('@uniswap/token-list-bridge-utils');

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
    logoURI: "https://raw.githubusercontent.com/pollum-io/pegasys-tokenlists/master/logos/0xd3e822f3ef011Ca5f17D82C956D952D8d7C3A1BB/logo.png",
    keywords: ["pegasys", "default"],
    tokens: [...rollux, ...rollux_tanenbaum]
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
