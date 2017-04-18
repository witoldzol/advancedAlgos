// -------------------  1 ---- 
 
function telephoneCheck(str) {
 
  
  
  //target all non-digit characters
  var a = /\D/g;
  //remove all non-digit characters with '' (nothing)
  var strNum = str.replace(a,'');
 
  //first and fourth case (with - or white space "-|\s")
  var b = /^\d{3}-|\s\d{3}-|\s\d{4}$/;
  //same as above, but includes 1 at the start
  var b1 = /^1\s{0,1}\d{3}-|\s\d{3}-|\s\d{4}$/;
  
  //second and third (with optional one white space)
  var c = /^\(\d{3}\)\s{0,1}\d{3}-\d{4}$/;
  //same  as above + 1
  var c1= /^1\s{0,1}\(\d{3}\)\s{0,1}\d{3}-\d{4}$/;
  
  //fifth and sixth option
  var d = /^\d{10}|\d{1}\s{0,1}\d{10}$/;
  //same as above +1
  var d1 = /^1\s{0,1}\d{10}|\d{1}\s{0,1}\d{10}$/;
  
  
  
  //if string has 11 digits, first digit should be a 1
  //I'm checking charAt in original string (not in strNum- when strNum was created, it coerced negative values to positive one's)
  if(strNum.length === 11 && str.charAt(0) == 1){
     
        if(b1.test(str) || c1.test(str) || d1.test(str)){
          return true;
        } else {
          return false;
        }
     
       
  }
  //if string has 10 digits
  else if (strNum.length === 10){
      if (b.test(str) || c.test(str) || d.test(str)){
      
      return true;
      }
      else {
      return false; 
      }
   
  }
  //if string has more or less than 10//11 digits, return false
  else {
    return false;
  }
  
  
}
 
telephoneCheck("-1 (757) 622-7382");

// -------------------  2 ----- update object properties


// Setup
var collection = {
    "2548": {
      "album": "Slippery When Wet",
      "artist": "Bon Jovi",
      "tracks": [ 
        "Let It Rock", 
        "You Give Love a Bad Name" 
      ]
    },
    "2468": {
      "album": "1999",
      "artist": "Prince",
      "tracks": [ 
        "1999", 
        "Little Red Corvette" 
      ]
    },
    "1245": {
      "artist": "Robert Palmer",
      "tracks": [ ]
    },
    "5439": {
      "album": "ABBA Gold"
    }
};
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));

// Only change code below this line
function updateRecords(id, prop, value) {
  
  //if we have prop = tracks
  //and value is NOT empty, we add empty array
  
  if(prop=="tracks" && value !==""){
    
    if(!collection[id].tracks){
      collection[id].tracks = [];
    
    } 
    //once we have empty array, we can push value
    collection[id].tracks.push(value);
    
  }
  
  //if value for any property is empty, we remove this property  
  if(value === ""){
    delete collection[id][prop];
  }  
  //because tracks have special handling (which we took care already - line 37)
  //we need to ensure we don't overwrite previous changes
  //so we set if prop is NOT tracks..update record
  else if (prop !== "tracks"){
    collection[id][prop] = value;
  }
 
  
  //get beer
  return collection;
}

// Alter values below to test your code
updateRecords(5439, "tracks", "Take a Chance on Me");

// -------------------  3 ----- return array that conforms to 'SYMETRIC DIFFERENCE' rule (its a tricky one!)

 
 
function sym(args) {
 
  //create array with all arguments
  //we use spread operator (...)
  var arg = [...arguments];
 
  //remove duplicate from individual arrays
  //function written by Niccolò Campolungo on StackOverflow
  arg.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
  });
  //lets create holding array
  var arr =[];
 
  //now lets push argument arrays into holding array
  //outer loop (goes through nested arrays)
  for(i=0; i<arg.length; i++){
     
   arr.push(arg[i].filter(function(elem, index, self) {
    return index == self.indexOf(elem);
    }));
   
  }
 
  
  
  //function that passes the concatenated through objects, removes duplicates, and puts result back into array
  function symDif (newArr){
     
      //holding obj
      var obj ={};
 
      //looop through array that holds all elements and ... do magic?
      //object can hold only one property with the same name, so if we encounter the same
      //property name, we will overrite the associate value to a DUPLICATE - awesome!
      //arguments with dup are duplicate, not dupe are unique...simple...whatever
      for(var j=0; j < newArr.length; j++){
        var d = newArr[j];
        //NOT GOOD ENOUGH, if single array has duplicate entries, and another doesn't have that number, it will
        //still register as dupli, and that's not the case in symmetric difference!
        //thats why we removed all duplicates in line 21/22/23 (from each individual array)
        obj[d] = obj[d] ? "dup" : "notdup";
      }
 
      //create and assign array of obj keys
      var t = Object.keys(obj);
 
      //filter through obj keys returning only non duplicates
      arr = t.filter(function(key){
 
        return obj[key] == "notdup";
 
      });
     
      //because we passed values through objects, they returned as strings
      //we multiply items by 1 to convert them to numbers again ( js does it for us bo coercing the values)
      return arr.map(function(x){
        return x * 1;
      });
  }
  
  //final function
  //it adds nested arrays to each other, and passes them through the function that removes duplicates
  var t = arr.reduce(function(x,y){
     //combine 'first' array with the 'second' one
      var f = x.concat(y);
     //pass it to the function, return the result 
     //the returned result becomes 'x' and it gets concateded with the next array...
      return symDif(f);
   
  });
  //win, get beer
  return  t;
 
}
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]);

// -------------------  4 ----- Return change 
   
function checkCashRegister(price, cash, cid) {
  
 
  //array of values in order they appear 
  var denominations = [0.01,0.05,0.1,0.25,1,5,10,20,100];
  //same as above, but reversed - we reverse, because our logic will work from 
  //highest bills, to lowest (take change - 100, if still left some change, - 20 etc...working down)
  var b = denominations.reverse();
  
  //ROUNDING IS A CONSTANT ISSUE, pretty much apply below function to each number to avoid surprises
  //rounding function obtained from Stack Overflow
  //http://stackoverflow.com/questions/20701029/rounding-issue-in-math-round-tofixed
  function roundNum(num, length) { 
    var number = Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
    return number;
  }
 
  var cashRegister = 0;
  
  //holding object
  var obj = {};
  
  //let's loop through array and push keys:values into holding object
  for(i=0; i<cid.length; i++){
    
    obj[cid[i][0]] = cid[i][1];
    
  }
  //loop through original array and add up all values
  for(i=0; i<cid.length; i++){
    cashRegister = cashRegister + cid[i][1];
  }
  
  //var c is a total cash we have in register
  //this is a trick to round the number up to second decimal place
  var c = (cashRegister * 100) /100;
  
  
  //array of values of the cash we have in register
  var v = Object.values(obj).reverse();
  //array of keys
  var k = Object.keys(obj).reverse();
  var arr = [];
  //total change for the customer
  var d = cash-price;
  //we duplicate this variable, because we want to look up original value later on
  var d2 = cash-price; 
  //temporary variable to keep track of what we accumulated so far ( we aim for sum to reach equality with   //required change)
  
  
  
  //outside loop, goes through each denomination
  for(i=0; i<v.length; i++){
    
    //lets calculate how many times we need to iterate to exhaust given 'bill'
    var n = v[i]/b[i];
    //variable to count how many times we used given bill/denomination
    var counter = 0;
      
        //nested loop, goes through the same denomination until it's exhausted or conditions are met
        //ex. our change == our combined sum of paid out monies
        for(j=0; j<n; j++){
          
            //internal condition, we check if applying given bill will not 'overkill' change
            //ex. we need to give $15 back, so we test for first $100, 15-100 = negative, so we break loop
            //and go to one step lower denomination (20)...and so on 
            if(roundNum(d-b[i],2) >= 0){
              
                //var d keeps track of the change that is left to be given (we keep substracting from it)
                d = roundNum(d-b[i],2);
                
                //increment counter by one each time we loop through given denomination/bill
                counter++;
                
                //first condition, if change to give reaches zero AND our total change == our total cash
                //in register, we can CLOSE register 
                if(d === 0 && c === d2){
                  return "Closed";
                }
                //second condition, change gets to zero, we still have monies left in register
                else if(d === 0){
                  //we push in case we meet the criterium before loop ends executing completely
                  arr.push([k[i],((b[i]*counter).toFixed(2))*1]);
                  return arr;
                } 
            }
            //break loop if we overkill change with current denomination
            else {
              break;
            }

        }
        //if nested loop exhausts all available bills, push them to holding array, and move on 
        if(counter !== 0){
          //toFixed(2) will force display of two decimal places 
          //we multiply by 1 in order to coerce strings to numbers (old trick at this stage)
          arr.push([k[i],((b[i]*counter).toFixed(2))*1]);
        }
   
  }
  //if we didn't any of the previous conditions, we either have insufficient monies OR
  //our we can't give out exact change because we lack certain bills/coins
  return "Insufficient Funds"; 
  
  //get beer!
}
 
 
checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);

// -------------------  5 ----- compare 2D arrays, add new items, sort alphabetiacally


function updateInventory(arr1, arr2) {
    
  
    //outer loop
    for(i=0; i<arr2.length; i++){
        //temporary var that resets with iteration of outer loop
        var state = "";
        
        for(j=0; j<arr1.length; j++){
            
            //if we have matched an item in new delivery
            if(arr2[i][1]==arr1[j][1]){
              //add to quantity
              arr1[j][0] = arr1[j][0] + arr2[i][0];
              //set temp var to 'found'
              state = "found";
            } 
          
        }
        //if state is not equal to 'found' we know that we have a new item, and we push it into array
        if(state !== "found"){
          arr1.push(arr2[i]);
        }
    }
  
    //finally, sort alphabetically 
    return arr1.sort(function(a,b){
        //get beer!
        return a[1]>b[1];
    });
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);

// -------------------  6 ----- repeats


function permAlone(str) {
  
  
  var l = str.length;
  
  function factorial (x){
    if(x === 0){
      return 1;
    }
    return x * factorial(x-1);
  }
  
  
  
  
  
  return factorial(l) - factorial(l-1);
  
  
}

permAlone('abfdefa');

// -------------------  7 -----  Recursive function that generates permutations of a string

function permAlone(str) {
 
  
  
  
 var m = str.match(/(\w)\1+/); 
 
  
  
}

permAlone('abcd');

} 
permAlone('aab');

