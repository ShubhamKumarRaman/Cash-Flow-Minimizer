export const minimizeCashFlow = (balanceMap) => {
    const users = Object.keys(balanceMap);
    const balances = users.map((u) => Math.round(Number(balanceMap[u]) * 100));

    const result = [];

    const getMaxIndex = (arr) => arr.indexOf(Math.max(...arr));
    const getMinIndex = (arr) => arr.indexOf(Math.min(...arr));

    // Safety: should converge quickly, but keep a cap for corrupt inputs.
    const maxIterations = Math.max(1000, users.length * users.length * 5);
    let iterations = 0;

    while (true) {
        if (iterations++ > maxIterations) {
            throw new Error('Settlement computation did not converge (balances may not sum to zero)');
        }

        let maxCreditor = getMaxIndex(balances);
        let maxDebtor = getMinIndex(balances);

        //Stop condition
        if (balances[maxCreditor] === 0 && balances[maxDebtor] === 0)
            break;

        // If everyone is non-negative or non-positive, we can't settle further.
        if (balances[maxCreditor] <= 0 || balances[maxDebtor] >= 0) {
            break;
        }

        let amount = Math.min(
            balances[maxCreditor],
            -balances[maxDebtor]
        )

        if (amount <= 0) break;

        //Update balances
        balances[maxCreditor] -= amount;
        balances[maxDebtor] += amount;

        result.push({
            from: users[maxDebtor],
            to: users[maxCreditor],
            amount: amount / 100,
        })
    }
    return result;
}