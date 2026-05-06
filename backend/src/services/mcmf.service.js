import { calculateBalances } from "./balance.service.js";
import { MinCostMaxFlow } from "../algorithms/minCostMaxFlow.js";

export const optimizeWithMCMF = async (groupId) => {
  const balanceMap = await calculateBalances(groupId);

  const users = Object.keys(balanceMap);
  const n = users.length;

  const source = n;
  const sink = n + 1;

  const mcmf = new MinCostMaxFlow(n + 2);

  // Build graph
  users.forEach((user, i) => {
    const balance = balanceMap[user];

    if (balance > 0) {
      // creditor
      mcmf.addEdge(i, sink, balance, 0);
    } else if (balance < 0) {
      // debtor
      mcmf.addEdge(source, i, -balance, 0);
    }
  });

  // Connect debtors → creditors
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (balanceMap[users[i]] < 0 && balanceMap[users[j]] > 0) {
        // cost = 1 (can be replaced with real cost logic)
        mcmf.addEdge(i, j, Infinity, 1);
      }
    }
  }

  const cost = mcmf.minCostFlow(source, sink);

  return {
    message: "Optimized using Min-Cost Max-Flow",
    cost,
  };
};