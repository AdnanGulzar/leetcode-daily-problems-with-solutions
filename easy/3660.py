# 3760. Maximum Substrings With Distinct Start
class Solution:
    def maxDistinct(self, s: str) -> int:
        res={}
        for c in s:
            res[c]=res.get(c, 0) + 1
        return len(res)
        
