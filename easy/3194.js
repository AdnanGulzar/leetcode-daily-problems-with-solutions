// 3194. Minimum Average of Smallest and Largest Elements
// You have an array of floating point numbers averages which is initially empty. You are given an array nums of n integers where n is even.
// You repeat the following procedure n / 2 times:
// Remove the smallest element, minElement, and the largest element maxElement, from nums.
// Add (minElement + maxElement) / 2 to averages.
// Return the minimum element in averages.

// solution

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumAverage = function(nums) {
    let averages=[]
    let length=nums.length
    let sortedNum=nums.sort((a,b)=>a-b)
    for(let i=0;i<length/2;i++){
        let min =sortedNum[i];
        let max=sortedNum[length-1-i]
        averages.push((min+max)/2)        
    }

    return Math.min(...averages)
    
};
