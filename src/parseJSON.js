//Manual Tests

//passed -- var string = JSON.stringify("john")
//passed -- var boolean = JSON.stringify(false)
//passed -- var nullValue = JSON.stringify(null)
//passed -- var number = JSON.stringify(483785)

//passed(nested objects and arrays inside arrays)
//var array = JSON.stringify([[1,"kevin",[1,2,3],{x:1,y:2}],[44,34343434,true]])

//passed(nested arrays and objects inside objects)
//var object = JSON.stringify( {a:[1,2,3,[4,5,6]],b:"kevin",c:{d:{e:"jo hn"}}} );


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
  //array test - code 91 is '['
  if(code === 91) {
    var array = json.split('');
    array.shift();
    array.pop();
    var newArray = [];
    var count = 0;
    for(var i=0; i<array.length; i++) {
      var n = array[i].charCodeAt();
      //recursive case for nested arrays inside arrays
      if(n === 91) {
        newArray.push(array[i]);
        for(var x=i+1; x<array.length; x++) {
          // if "[ " => getting far from equal
          if (array[x].charCodeAt() === 91) {
            newArray[newArray.length-1] += array[x];
            count++;
          }
          // if "]" AND not 0 => getting close to equal
          else if (array[x].charCodeAt() === 93 && count !== 0) {
            newArray[newArray.length-1] += array[x];
            count--;
          }
          //if "]" AND 0 => ends, change i, end x-loop
          else if (array[x].charCodeAt() === 93 && count === 0) {
            newArray[newArray.length-1] += array[x];
            i = x;
            x = array.length;
          }
          //else, just add
          else if (array[x].charCodeAt() !== 93) {
            newArray[newArray.length-1] += array[x];
          }
        }
      }
      //recursive case for nested objects inside arrays
      else if(n === 123) {
        newArray.push(array[i]);
        for(var x=i+1; x<array.length; x++) {
          // if "[ " => getting far from equal
          if (array[x].charCodeAt() === 123) {
            newArray[newArray.length-1] += array[x];
            count++;
          }
          // if "]" AND not 0 => getting close to equal
          else if (array[x].charCodeAt() === 125 && count !== 0) {
            newArray[newArray.length-1] += array[x];
            count--;
          }
          //if "]" AND 0 => ends, change i, end x-loop
          else if (array[x].charCodeAt() === 125 && count === 0) {
            newArray[newArray.length-1] += array[x];
            i = x;
            x = array.length;
          }
          //else, just add
          else if (array[x].charCodeAt() !== 125) {
            newArray[newArray.length-1] += array[x];
          }
        }
      }
      //base case for arrays
      else {
        //if not "," AND concat = 'OFF' => then push value to newArray, turn concat 'ON'
        if (n !== 44 && count === 0) {
          newArray.push(array[i]);
          count = 1;
        }
        //if not "," AND concat = 'ON' => then concat to last value of newArray
        else if(n !== 44 && count === 1) {
          newArray[newArray.length-1] += array[i];
        }
        //if "," => parse the last value using recursion
        else if(n === 44) {
          newArray[newArray.length-1] = parseJSON(newArray[newArray.length-1]);
          count = 0;
        }
      }
    }
    //when there are no more "," => parse the last value using recursion
    newArray[newArray.length-1] = parseJSON(newArray[newArray.length-1]);
    return newArray;
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
      var n = string[i].charCodeAt();
      var current = string[i];
      //recursive case for nested objects inside objects
      if(n === 123) {
        value += current;
        for(var x=i+1; x<string.length; x++) {
          // if "{" => getting far from equal
          if (string[x].charCodeAt() === 123) {
            value += string[x];
            count++;
          }
          // if "}" AND not 0 => getting close to equal
          else if (string[x].charCodeAt() === 125 && count !== 0) {
            value += string[x];
            count--;
          }
          //if "}" AND 0 => ends, change i, end x-loop
          else if (string[x].charCodeAt() === 125 && count === 0) {
            value += string[x];
            value = parseJSON(value);
            object[key] = value;
            key = '';
            value = '';
            isKey = 'yes';
            i = x+1;
            x = string.length;
          }
          //else, just add
          else if (string[x].charCodeAt() !== 125) {
            value += string[x];
          }
        }
      }
      //recursive case for nested arrays inside objects
      else if(n === 91) {
        value += current;
        for(var x=i+1; x<string.length; x++) {
          // if "{" => getting far from equal
          if (string[x].charCodeAt() === 91) {
            value += string[x];
            count++;
          }
          // if "}" AND not 0 => getting close to equal
          else if (string[x].charCodeAt() === 93 && count !== 0) {
            value += string[x];
            count--;
          }
          //if "}" AND 0 => ends, change i, end x-loop
          else if (string[x].charCodeAt() === 93 && count === 0) {
            value += string[x];
            value = parseJSON(value);
            object[key] = value;
            key = '';
            value = '';
            isKey = 'yes';
            i = x+1;
            x = string.length;
          }
          //else, just add
          else if (string[x].charCodeAt() !== 125) {
            value += string[x];
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