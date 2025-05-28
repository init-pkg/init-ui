require("dotenv").config();

const isDisabled = process.env.DISABLE_BLACK_LIST === "true";

module.exports = {
  rules: {
    blacklist: ({ header }) => {
      if (isDisabled) return [true, "⚠️ Blacklist Disabled"];
      const blacklist = ["WIP:", "temp:", "ignore:", "fix: site"];
      const isBlacklisted = blacklist.some((term) => header.startsWith(term));
      return [!isBlacklisted, "Commit message contains blacklisted terms"];
    },
  },
};
