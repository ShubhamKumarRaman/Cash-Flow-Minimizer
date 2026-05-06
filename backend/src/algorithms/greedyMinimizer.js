export const minimizeCashFlow = (balanceMap) => {
    const users = Object.keys(balanceMap);
    const balances = users.map((u) => balanceMap[u]);

    const result = [];

    const getMaxIndex = (arr) => arr.indexOf(Math.max(...arr));
    const getMinIndex = (arr) => arr.indexOf(Math.min(...arr));

    while (true) {
        let maxCreditor = getMaxIndex(balances);
        let maxDebtor = getMinIndex(balances);

        //Stop condition
        if (balances[maxCreditor] === 0 && balances[maxDebtor] === 0)
            break;

        let amount = Math.min(
            balances[maxCreditor],
            -balances[maxDebtor]
        )

        //Update balances
        balances[maxCreditor] -= amount;
        balances[maxDebtor] += amount;

        result.push({
            from: users[maxDebtor],
            to: users[maxCreditor],
            amount,
        })
    }
    return result;
}