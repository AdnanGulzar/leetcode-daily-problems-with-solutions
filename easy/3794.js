// 3794. Reverse String Prefix

// You are given a string s and an integer k.

// Reverse the first k characters of s and return the resulting string.
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
