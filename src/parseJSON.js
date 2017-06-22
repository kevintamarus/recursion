//Manual Tests

//passed -- var string = JSON.stringify("john")
//passed -- var boolean = JSON.stringify(false)
//passed -- var nullValue = JSON.stringify(null)
//passed -- var number = JSON.stringify(483785)

//passed(nested objects and arrays inside arrays)
var arrayTest = JSON.stringify([[1,"kevin",[1,2,3],{x:1,y:2}],[44,34343434,true]])

//passed(nested arrays and objects inside objects)
var objectTest = JSON.stringify( {a:[1,2,3,[4,5,6]],b:"kevin",c:{d:{e:"jo hn"}}} );

//passed(nested object in array in object)
var objectTest2 = JSON.stringify( {a:[1,2,3,{starbucks:"coffee bean"}],b:"kevin",c:{d:{e:"jo hn"}}} );


//parsing a function string(undefined) will throw a different error
//how can I program the function to throw a syntax error?
var parseJSON = function(json) {
  //using the first charCode to determine what type of string json is
  var code = json.charCodeAt()
  //string test - code 34 is '"'
  if(code === 34) {
    return json.slice(1, json.length-1);
  }
  //boolean true test - code 116 is 't'
  if(code === 116) {
    return true;
  }
  //boolean false test - code 102 is 'f'
  if(code === 102) {
    return false;
  }
  //null test - code 102 is 'n'
  if(code === 110) {
    return null;
  }
  //number test - code 48-57 is 0-9, code 45 is '-'
  if((code >= 48 && code <= 57) || code === 45) {
    return Number(json);
  }
  // "1,2,3"
  //array test - code 91 is '['
  if(code === 91) {
    var string = json.slice(1, json.length-1) + ',';
    var value = '';
    var current = '';
    var array = [];
    var count = 0;
    for(var i=0; i<string.length; i++) {
      var current = string[i];
      var n = string[i].charCodeAt();
      //step case for nested arrays inside arrays
      if(n === 91) {
        value += current;
        for(var x=i+1; x<string.length; x++) {
          current = string[x];
          n = current.charCodeAt();
          // if "[ " => getting far from equal
          if (n === 91) {
            value += current;
            count++;
          }
          // if "]" AND not 0 => getting close to equal
          else if (n === 93 && count !== 0) {
            value += current;
            count--;
          }
          //if "]" AND 0 => ends, change i, end x-loop
          else if (n === 93 && count === 0) {
            value += current;
            array.push(parseJSON(value));
            value = '';
            i = x+1;
            x = string.length; //ends x loop
          }
          //else, just add
          else {
            value += current;
          }
        }
      }
      //step case for nested objects inside arrays
      else if(n === 123) {
        value += current;
        for(var x=i+1; x<string.length; x++) {
          current = string[x];
          n = current.charCodeAt();
          // if "{ " => getting far from equal
          if (n === 123) {
            value += current;
            count++;
          }
          // if "}" AND not 0 => getting close to equal
          else if (n === 125 && count !== 0) {
            value += current;
            count--;
          }
          //if "}" AND 0 => ends, change i, end x-loop
          else if (n === 125 && count === 0) {
            value += current;
            array.push(parseJSON(value));
            value = '';
            i = x+1;
            x = string.length;
          }
          //else, just add
          else {
            value += current;
          }
        }
      }
      //base case for arrays
      else {
        //if not "," -> add to value
        if (n !== 44) {
          value += current;
        }
        //if "," => parse the last value using recursion
        else {
          array.push(parseJSON(value));
          value = '';
          current= '';
        }
      }
    }
    return array;
  }
  //object test - code 123 is '{'
  if(code === 123) {
    var string = json.slice(1, json.length-1) + ',';
    var object = {};
    var key = '';
    var value = '';
    var isKey = 'yes';
    var count = 0;
    for(var i=0; i<string.length; i++) {
      var current = string[i];
      var n = current.charCodeAt();
      //step case for nested objects inside objects
      if(n === 123) {
        value += current;
        for(var x=i+1; x<string.length; x++) {
          current = string[x];
          n = current.charCodeAt();
          // if "{" => getting far from equal
          if (n === 123) {
            value += current;
            count++;
          }
          // if "}" AND not 0 => getting close to equal
          else if (n === 125 && count !== 0) {
            value += current;
            count--;
          }
          //if "}" AND 0 => ends, change i, end x-loop
          else if (n === 125 && count === 0) {
            value += current;
            value = parseJSON(value);
            object[key] = value;
            key = '';
            value = '';
            isKey = 'yes';
            i = x+1;
            x = string.length;
          }
          //else, just add
          else {
            value += current;
          }
        }
      }
      //step case for nested arrays inside objects
      else if(n === 91) {
        value += current;
        for(var x=i+1; x<string.length; x++) {
          current = string[x];
          n = current.charCodeAt();
          // if "{" => getting far from equal
          if (n === 91) {
            value += current;
            count++;
          }
          // if "}" AND not 0 => getting close to equal
          else if (n === 93 && count !== 0) {
            value += current;
            count--;
          }
          //if "}" AND 0 => ends, change i, end x-loop
          else if (n === 93 && count === 0) {
            value += current;
            object[key] = parseJSON(value);
            key = '';
            value = '';
            isKey = 'yes';
            i = x+1;
            x = string.length;
          }
          //else, just add
          else {
            value += current;
          }
        }
      }
      //base case for objects
      else {
        //before the ":"
        if (n !== 58 && isKey === 'yes') {
        key += current;
        }
        else if (n === 58 && isKey === 'yes') {
          key = parseJSON(key);
          object[key] = 0;
          isKey = 'no';
        }
        //after the ":", before the ","
        else if (n !== 44 && isKey ==='no') {
          value += current;
        }
        else if (n === 44 && isKey ==='no') {
          value = parseJSON(value);
          object[key] = value;
          key = '';
          value = '';
          isKey = 'yes';
        }
      }
    }
    return object;
  }
  //undefined
  else {
    return undefined;
  }
};

console.log(parseJSON(arrayTest));
console.log(parseJSON(objectTest));
console.log(parseJSON(objectTest2));