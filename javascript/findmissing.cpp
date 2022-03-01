#include <iostream>

int findmissing(int arr[]){
    int i;int total;
    total = (100+1)*(100+2)/2;
    for(int i=1;i<=100;i++){
        total -=arr[i];
      
    }
      return total;
}
int  main(){
int arr[100];
for(int i=1;i<=100;i++){
  std::cin>>arr[i];
}
int result = findmissing(arr);
std::cout<<result;
return 0;

}



