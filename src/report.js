const {getTrips, getDriver} = require('api');

/**
 * This function should return the data for drivers in the specified format
 *
 * Question 4
 *
 * @returns {any} Driver report data
 */



async function driverReport() {
  const tripData = await getTrips();
 console.log(tripData)

 let newd = await getDriver("d247da84-ffcb-4ca8-8459-f98c99b59822")
 console.log(newd)
  

//converted tripData bill amount to all number
let newTripData= tripData.filter((item)=>{

  let removecoma = "";
  let numconvert= item.billedAmount;
  console.log(item.billedAmount)
  if(typeof item.billedAmount ==="string"){
 for(let elem of  item.billedAmount){
   if(elem ===","){ 
     
     removecoma +="";    
   }else{
 removecoma+=elem;
 
   }
 }
 item.billedAmount=Number(removecoma);
 
 console.log(numconvert)
}
return item

});

console.log(newTripData)





let billedTotal = 0;





//Total Billed Amount for all trips
 billedTotal = newTripData.reduce((acc,item)=>{

      
    return acc += item.billedAmount

//    let removecoma = "";
//    let numconvert= item.billedAmount;
//    console.log(item.billedAmount)
//    if(typeof item.billedAmount ==="string"){
//   for(let elem of  item.billedAmount){
//     if(elem ===","){ 
      
//       removecoma +="";    
//     }else{
//   removecoma+=elem;
  
//     }
//   }
//   numconvert=Number(removecoma);
//   console.log(numconvert)
// }
// return acc + numconvert;

 },0);
billedTotal = billedTotal.toFixed(2);
console.log(billedTotal);



//Bill isCash = true Array
let BillCashArray = newTripData.filter((item)=>{
  return item.isCash === true;
});

//Bill isCash = false Array
let BillNonCashArray = tripData.filter((item)=>{
  return item.isCash === false;
});


//Total Billed Amount for all trips that are cash.
let cashBilledTotal =BillCashArray.reduce((acc,item)=>{

  return acc+=item.billedAmount
//   let removecoma = "";
//   let numconvert= item.billedAmount;
//   console.log(item.billedAmount)
//   if(typeof item.billedAmount ==="string"){
//  for(let elem of  item.billedAmount){
//    if(elem ===","){ 
     
//      removecoma +="";    
//    }else{
//  removecoma+=elem;
 
//    }
//  }
//  numconvert=Number(removecoma);
// }
// return acc + numconvert;

},0);
cashBilledTotal = cashBilledTotal.toFixed(2);
console.log(cashBilledTotal)



//Total Billed Amount for all trips that are not Cash.
let nonCashBilledTotal =BillNonCashArray.reduce((acc,item)=>{

      return acc+=item.billedAmount;
//   let removecoma = "";
//   let numconvert= item.billedAmount;
//   console.log(item.billedAmount)
//   if(typeof item.billedAmount ==="string"){
//  for(let elem of  item.billedAmount){
//    if(elem ===","){ 
     
//      removecoma +="";    
//    }else{
//  removecoma+=elem;
 
//    }
//  }
//  numconvert=Number(removecoma);
// }
// return acc + numconvert;

},0);
nonCashBilledTotal= nonCashBilledTotal.toFixed(2);
console.log(nonCashBilledTotal)


//No Of Cash Trips
let noOfCashTrips = BillCashArray.length;
console.log(noOfCashTrips);

//No of Non Cash Trips
let noOfNonCashTrips = BillNonCashArray.length;
console.log(noOfNonCashTrips);

// Information for driver with the most trips
let groupdrivers = {};
let noOfdrivers = 0;
let noOfDriversWithMostTrips= tripData.reduce((groupdrivers,driver)=>{


    if(groupdrivers.hasOwnProperty(driver.driverID)){
       groupdrivers[driver.driverID]++;

    }else{
      groupdrivers[driver.driverID]= 1;
    }

return groupdrivers;
},groupdrivers);

    let driverWithMostTripResult = {}
     let theParticularDriverTripNumber = "";
     let theParticularDriverKey ="";
console.log(noOfDriversWithMostTrips);
    let value =Object.values(noOfDriversWithMostTrips).sort();
    console.log(value)
    let highesttrip = value.pop();
    console.log(highesttrip)
    for( let elem in noOfDriversWithMostTrips){
      console.log(elem)
      if(noOfDriversWithMostTrips[elem] === highesttrip){
         theParticularDriverTripNumber = noOfDriversWithMostTrips[elem];
         theParticularDriverKey = elem;
        driverWithMostTripResult= await(getDriver(elem));

      }
    }
  let driverWithMostTrip = {}
  driverWithMostTrip.name = driverWithMostTripResult.name;
  driverWithMostTrip.email = driverWithMostTripResult.email;
  driverWithMostTrip.phone= driverWithMostTripResult.phone;
  driverWithMostTrip.noOfTrips = theParticularDriverTripNumber;

 
    console.log(driverWithMostTrip)
console.log(noOfdrivers)
console.log(tripData.length)




// No of Drivers that have more than one vehicle
let promiseArray = [];
console.log(noOfDriversWithMostTrips)
for (let item in noOfDriversWithMostTrips){
  console.log(item)
 
  promiseArray.push(getDriver(item).catch(err => {return {}}));

}
console.log(promiseArray)
const allDrivers = await Promise.all(promiseArray);
console.log(allDrivers)

let AllDriverWithName= allDrivers.filter((item)=>{

 if(Object.values(item).length!==0){
   return item;
 }
  
});
console.log(AllDriverWithName)

let noOfdriverscount = 0;

let noOfDriversWithMostTripsnumber = AllDriverWithName.reduce((acc,item)=>{
  if(item.vehicleID.length > 1){
  acc += 1
  }
  return acc
  
}, 0);
console.log(noOfDriversWithMostTripsnumber)


// highest earn driver

let highearn ={}
let highestearn= newTripData.reduce((highearn,driver)=>{
          console.log(driver.billedAmount)

  if(highearn.hasOwnProperty(driver.driverID)){
     highearn[driver.driverID]+=driver.billedAmount;
     
  }else{
   
    highearn[driver.driverID]= driver.billedAmount;
    console.log(highearn[driver.driverID])
  }
console.log(highearn)
return highearn;
},highearn);
console.log(highearn)
let highearnamount =Object.values(highearn).sort((a,b)=>{ return a-b}).pop();
console.log(highearnamount)
console.log(highearnamount)
let driverWithHighestEarnTripResult = {}
     let theParticularHighestEarnDriverTripAmount = "";
     let theParticularHighestEarnDriverKey ="";

    for( let elem in highearn){
      console.log(elem)
      if(highearn[elem] === highearnamount){
        theParticularHighestEarnDriverTripAmount= highearn[elem];
        theParticularHighestEarnDriverKey = elem;
        driverWithHighestEarnTripResult= await(getDriver(elem));

      }
    }
  let driverWithHighestEarn = {}
  driverWithHighestEarn.name = driverWithHighestEarnTripResult.name;
  driverWithHighestEarn.email = driverWithHighestEarnTripResult.email;
  driverWithHighestEarn.phone= driverWithHighestEarnTripResult.phone;
  driverWithHighestEarn.noOfTrips = noOfDriversWithMostTrips[theParticularHighestEarnDriverKey];
  driverWithHighestEarn.totalAmountEarned = theParticularHighestEarnDriverTripAmount;

 
     console.log(driverWithHighestEarn)




driverWithMostTrip
driverWithMostTrip.totalAmountEarned = highearn[theParticularDriverKey];
console.log(driverWithMostTrip)

let dataForAllTrips = {};
 dataForAllTrips.noOfCashTrips= BillCashArray.length;
 dataForAllTrips.noOfNonCashTrips =BillNonCashArray.length;
 dataForAllTrips.billedTotal =billedTotal;
 dataForAllTrips.cashBilledTotal = cashBilledTotal;
 dataForAllTrips.nonCashBilledTotal =nonCashBilledTotal;
 dataForAllTrips.mostTripsByDriver = driverWithMostTrip;
 dataForAllTrips.highestEarningDriver=driverWithHighestEarn;


 console.log(dataForAllTrips)


 let alldriversid =Object.keys(noOfDriversWithMostTrips)
  console.log(alldriversid);
//  let alldriversTripNumber =Object.values(noOfDriversWithMostTrips).sort();
//  let allDrivers =Object.values(noOfDriversWithMostTrips).sort();


    let driversArray = [];
     console.log(newTripData)
    for( let elem = 0; elem < newTripData.length; elem++){
      let driverObject = {}
      if(newTripData[elem].driverID){
        console.log(newTripData[elem].driverID)
        newTripData[elem].driverdetails = await getDriver(newTripData[elem].driverID).catch(err => {return {}});
       //console.log(getDriver(item.driverID))
      }

      driverObject.Fullname = newTripData[elem].driverdetails.name; 
      driverObject.id = newTripData[elem].driverID;
      
     driversArray.push(driverObject);


    }
    console.log(driversArray)
// let drivers =  newTripData.reduce((acc,item,index,newTripData)=>{
//   let driverObject = {}
//   alldriversid
//   // console.log(newTripdriver.length)
//   // console.log(index)
// // console.log(item)
// //   console.log(allDrivers)
// //   console.log(alldriversid)  
     
//     if(item.driverID === alldriversid[index]){
//       //console.log(alldriversid[index])
//      item.driverdetails =  getDriver(item.driverID);
//      //console.log(getDriver(item.driverID))
//     }
//     console.log(item.driverID)
//      driverObject.id = item.driverID;
//      driverObject.Fullname = item.driverdetails;
    
    
    
    
    
    
    
    
    
    
    
    
    
//     // console.log(driverObject)
//     acc.push(driverObject);
    
//      //console.log(acc)
//     return acc;
  

// },[]);

// console.log(drivers)

}
driverReport();