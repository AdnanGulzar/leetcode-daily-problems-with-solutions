// 3794. Reverse String Prefix
// Reverse the first k characters of s and return the resulting string.
// Example 1:

// Input: s = "abcd", k = 2

// Output: "bacd"

// Explanation:​​​​​​​

// The first k = 2 characters "ab" are reversed to "ba". The final resulting string is "bacd".

// solution

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reversePrefix = function(s, k) {
    let res=s.slice(0,k).split("").reverse().join("")
    let secondPart=s.slice(k,s.length)
    return  res+secondPart
    
};
