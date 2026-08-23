// 13. Roman to Integer
// Given a roman numeral, convert it to an integer.

// solution

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        const value = values[s[i]];
        if (i + 1 < s.length && value < values[s[i + 1]]) {
            total -= value;
        } else {
            total += value;
        }
    }
    return total;
};
