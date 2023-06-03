

#include <iostream>
#include<vector>
using namespace std;
vector<int> find_x(int n,int q,vector<int>queries){
    vector<int>ans(q);
    vector<long long>help((n*n)+1,-1);
    long long count=1;
    int dia=0;

    for(int i=0;i<=n;i++){
        for(int j=0;j<i;j++){
            help[count]=dia;
            count++;
        }
        dia++;
        
    }
    for(int i=n-1;i>=0;i--){
        for(int j=0;j<i;j++){
            help[count]=dia;
            count++;
        }
        dia++;
        
    }
    // for(int i=0;i<n*n+1;i++){
    //     cout<<help[i]<<" ";
    // }
    for(int i=0;i<q;i++){
        ans[i]=(help[queries[i]]);
        

        
    }
    return ans;
}

// vector<int> find_x(int n, int q, vector<int>& queries) {
//     vector<int> ans(q);
//     int dia = 0;

//     for (int i = 1; i <= q; i++) {
//         int count = ((i - 1) / 2) + 1;
//         ans[i - 1] = dia + count;
//         dia += count;
//     }

//     return ans;
// }
int main(){
    vector<int>temp;
    temp.push_back(1);
    temp.push_back(2);
    temp.push_back(4);
    temp.push_back(6);
    temp.push_back(11);
    temp.push_back(9);
    temp.push_back(12);
    temp.push_back(14);
    temp.push_back(16);
    temp.push_back(7);
    temp.push_back(8);
    vector<int>ans(11);
    ans=find_x(4,11,temp);
    for(int i=0;i<ans.size();i++){
        cout<<ans[i]<<" ";
    }

return 0;
}