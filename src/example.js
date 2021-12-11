// let str = "this is good is";
// let newStr = str.replace(/is/g,"we");
// console.log(newStr)






// let done = true

// const isItDoneYet = new Promise((resolve, reject) => {
  
//   if (done) {
//     const workDone = 'Here is the thing I built'
//     resolve(workDone)
//   } else {
//     const why = 'Still working on something else'
//     reject(why)
//   }
// })

// console.log(isItDoneYet)

// const checkIfItsDone = () => {
// isItDoneYet.then(data=> console.log(data))
// }

// console.log(checkIfItsDone());


// function solution(number){
//   let multiple = 0;
//   let hmultiple = 0
//   let stock = [];
//   let sum = 0;
//    console.log(number)
//   let count = 1;

//   while(multiple < number){  
//    multiple = 3 * count;
//    hmultiple = 5 * count;
//     count++;
//   if(multiple<number){
//   stock.push(multiple);
//   }
// if(hmultiple<number){
//   stock.push(hmultiple);
// }

//   }

//   let newMultple = new Set(stock); 
//   let newStock = Array.from(newMultple);
//   for(let elem of newStock){
//     sum +=elem;
//   }
// return sum;
  
// }

// console.log(solution(60));


// let arr = [1,2,3,4,5,6,7,8,9]

// let newArr= arr.reduce((acc,value)=>{
//   if(value <=6){
//     acc += value
//   }
//   return acc
// },0);
// console.log(newArr)

function isValidWalk(walk) {
  //insert brilliant code here

  let obj= {};
for(let elem of walk){
  if(obj.hasOwnProperty(elem)){
    obj[elem]++;
  }else{
    obj[elem] = 1;
  }
}
let count = 0;
for(let elem in obj){
  if(obj[elem]%2!==0){
    count++;
  }
}

console.log(walk.length)
if(walk.length % 2==0){
  return true;
}else{
  return false;
}





  // let obj = walk.reduce((acc,letter)=>{
  //   if({}.hasOwnProperty(letter)){
  //     console.log(letter)
  //     acc[letter]++;
  //   }else{
  //     console.log(letter)
  //      acc[letter] = 1;
  //   }
  // },{});

  

}



console.log(!isValidWalk(['w','e','w','e','w','e','w','e','w','e','w','e']))