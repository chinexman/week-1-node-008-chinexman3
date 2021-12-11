const { getTrips, getDriver } = require("api");

/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */
async function analysis() {
  // Your code goes here
  // Your code goes here
  const tripData = await getTrips();
  console.log(tripData);

  //converted tripData bill amount to all number
  let newTripData = tripData.filter((item) => {
    let removecoma = "";
    let numconvert = item.billedAmount;
    console.log(item.billedAmount);
    if (typeof item.billedAmount === "string") {
      for (let elem of item.billedAmount) {
        if (elem === ",") {
          removecoma += "";
        } else {
          removecoma += elem;
        }
      }
      item.billedAmount = Number(removecoma);

      console.log(numconvert);
    }
    return item;
  });

  console.log(newTripData);

  let billedTotal = 0;

  //Total Billed Amount for all trips
  billedTotal = newTripData.reduce((acc, item) => {
    return (acc += item.billedAmount);

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
  }, 0);
  billedTotal = billedTotal.toFixed(2);
  console.log(billedTotal);

  //Bill isCash = true Array
  let BillCashArray = newTripData.filter((item) => {
    return item.isCash === true;
  });

  //Bill isCash = false Array
  let BillNonCashArray = tripData.filter((item) => {
    return item.isCash === false;
  });

  //Total Billed Amount for all trips that are cash.
  let cashBilledTotal = BillCashArray.reduce((acc, item) => {
    return (acc += item.billedAmount);
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
  }, 0);
  cashBilledTotal = cashBilledTotal.toFixed(2);
  console.log(cashBilledTotal);

  //Total Billed Amount for all trips that are not Cash.
  let nonCashBilledTotal = BillNonCashArray.reduce((acc, item) => {
    return (acc += item.billedAmount);
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
  }, 0);
  nonCashBilledTotal = nonCashBilledTotal.toFixed(2);
  console.log(nonCashBilledTotal);

  //No Of Cash Trips
  let noOfCashTrips = BillCashArray.length;
  console.log(noOfCashTrips);

  //No of Non Cash Trips
  let noOfNonCashTrips = BillNonCashArray.length;
  console.log(noOfNonCashTrips);

  // Information for driver with the most trips
  let groupdrivers = {};
  let noOfdrivers = 0;
  let noOfDriversWithMostTrips = tripData.reduce((groupdrivers, driver) => {
    if (groupdrivers.hasOwnProperty(driver.driverID)) {
      groupdrivers[driver.driverID]++;
    } else {
      groupdrivers[driver.driverID] = 1;
    }

    return groupdrivers;
  }, groupdrivers);

  let driverWithMostTripResult = {};
  let theParticularDriverTripNumber = "";
  let theParticularDriverKey = "";
  console.log(noOfDriversWithMostTrips);
  let value = Object.values(noOfDriversWithMostTrips).sort();

  console.log(value);
  let highesttrip = value[value.length - 2];
  let cool = Object.entries(noOfDriversWithMostTrips);
  console.log(cool);
  let hightripDriverId = Object.entries(noOfDriversWithMostTrips).find(
    (arr) => arr[1] === highesttrip
  )[0];
  theParticularDriverTripNumber = Object.entries(noOfDriversWithMostTrips).find(
    (arr) => arr[1] === highesttrip
  )[1];
  theParticularDriverKey = hightripDriverId;
  driverWithMostTripResult = await getDriver(hightripDriverId);
  driverWithMostTripResult;

  // console.log(highesttrip)
  // for( let elem in noOfDriversWithMostTrips){
  //   console.log(elem)
  //   if(noOfDriversWithMostTrips[elem] === highesttrip ){
  //      theParticularDriverTripNumber = noOfDriversWithMostTrips[elem];
  //      theParticularDriverKey = elem;
  //     driverWithMostTripResult= await(getDriver(elem));

  //   }
  // }
  let driverWithMostTrip = {};
  driverWithMostTrip.name = driverWithMostTripResult.name;
  driverWithMostTrip.email = driverWithMostTripResult.email;
  driverWithMostTrip.phone = driverWithMostTripResult.phone;
  driverWithMostTrip.noOfTrips = theParticularDriverTripNumber;

  console.log(driverWithMostTrip);
  console.log(noOfdrivers);
  console.log(tripData.length);

  // No of Drivers that have more than one vehicle
  let promiseArray = [];

  for (let item in noOfDriversWithMostTrips) {
    console.log(item);
    promiseArray.push(
      getDriver(item).catch((err) => {
        return {};
      })
    );
  }
  console.log(promiseArray);
  const allDrivers = await Promise.all(promiseArray);
  console.log(allDrivers);

  let AllDriverWithName = allDrivers.filter((item) => {
    if (Object.values(item).length !== 0) {
      return item;
    }
  });
  console.log(AllDriverWithName);

  let noOfdriverscount = 0;

  let noOfDriversWithMostTripsnumber = AllDriverWithName.reduce((acc, item) => {
    if (item.vehicleID.length > 1) {
      acc += 1;
    }
    return acc;
  }, 0);
  console.log(noOfDriversWithMostTripsnumber);

  // highest earn driver

  let highearn = {};
  let highestearn = newTripData.reduce((highearn, driver) => {
    console.log(driver.billedAmount);

    if (highearn.hasOwnProperty(driver.driverID)) {
      highearn[driver.driverID] += driver.billedAmount;
    } else {
      highearn[driver.driverID] = driver.billedAmount;
      console.log(highearn[driver.driverID]);
    }
    console.log(highearn);
    return highearn;
  }, highearn);
  console.log(highearn);
  let highearnamount = Object.values(highearn)
    .sort((a, b) => {
      return a - b;
    })
    .pop();
  console.log(highearnamount);
  console.log(highearnamount);
  let driverWithHighestEarnTripResult = {};
  let theParticularHighestEarnDriverTripAmount = "";
  let theParticularHighestEarnDriverKey = "";

  for (let elem in highearn) {
    console.log(elem);
    if (highearn[elem] === highearnamount) {
      theParticularHighestEarnDriverTripAmount = highearn[elem];
      theParticularHighestEarnDriverKey = elem;
      driverWithHighestEarnTripResult = await getDriver(elem);
    }
  }
  let driverWithHighestEarn = {};
  driverWithHighestEarn.name = driverWithHighestEarnTripResult.name;
  driverWithHighestEarn.email = driverWithHighestEarnTripResult.email;
  driverWithHighestEarn.phone = driverWithHighestEarnTripResult.phone;
  driverWithHighestEarn.noOfTrips =
    noOfDriversWithMostTrips[theParticularHighestEarnDriverKey];
  driverWithHighestEarn.totalAmountEarned =
    theParticularHighestEarnDriverTripAmount;

  console.log(driverWithHighestEarn);

  driverWithMostTrip;
  driverWithMostTrip.totalAmountEarned = highearn[theParticularDriverKey];
  console.log(driverWithMostTrip);

  let dataForAllTrips = {};
  dataForAllTrips.noOfCashTrips = BillCashArray.length;
  dataForAllTrips.noOfNonCashTrips = BillNonCashArray.length;
  dataForAllTrips.billedTotal = Number(billedTotal);
  dataForAllTrips.cashBilledTotal = Number(cashBilledTotal);
  dataForAllTrips.nonCashBilledTotal = Number(nonCashBilledTotal);
  dataForAllTrips.noOfDriversWithMoreThanOneVechicle =
    noOfDriversWithMostTripsnumber;
  dataForAllTrips.mostTripsByDriver = driverWithMostTrip;
  dataForAllTrips.highestEarningDriver = driverWithHighestEarn;

  dataForAllTrips;
  return dataForAllTrips;
}

analysis();
module.exports = analysis;

// let newobj = {
//   and : [ "etdh","skks"],
//   is: 3
// }

// newobj.cool = ['lol']
// newobj.cool.push('hello')
// // console.log(newobj.and.length);
// newobj.cool.push(5);
// console.log(newobj);

// let arr = [{a:2},{b:3},{c:4}];
// let ar = [ [1,2],[3,4],[5,6]]
// let newarr= Object.fromEntries(ar);
// console.log(newarr)
// let arr2 = [{a:"good"},{b:"cool"},{c:"awesome"}];

// for(let elem of arr2){

// }
