export const calculateInterest = (amount, rate, daysLate) => {
    return amount + (amount * rate * daysLate) / 365;
}