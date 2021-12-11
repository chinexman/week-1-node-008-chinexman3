function packArray (arr) {
    
    let count = 0;
    
    while(arr.length>1){
     let sumArray = [];
     let productArray = [];

for ( let elem = 0 ; elem < arr.length; elem++){

  sumArray.push(arr[elem]+ arr[elem +1]);
  elem++
  
}
arr=sumArray;
if(arr.length >1){
for ( let elem = 0 ; elem < sumArray.length; elem++){
    let product = sumArray[elem] * sumArray[elem +1];
    console.log(product)
  productArray.push(product);
  elem++
  
}

arr = productArray
}else{
arr = sumArray
}



}




return arr[0];
}

console.log(packArray([1, 2, 3, 4, 5, 6, 7, 8]));