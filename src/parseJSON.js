//Manual tests:

var string = JSON.stringify("john")
var boolean = JSON.stringify(false)
var nullValue = JSON.stringify(null)
var number = JSON.stringify(483785)
var array = JSON.stringify([12,"john", true, "Ke vin", false, 3])
var object = JSON.stringify({a:1, b:"john", c:"Ke vin", d:isSyntax})


//NEED TO account for Array of objects, object of arrays, etc
var parseJSON = function(json) {
  var code = json.charCodeAt()
  //string
  if(code === 34) {
    return json.slice(1, json.length-1);
  }
  //boolean true
  if(code === 116) {
    return true;
  }
  //boolean false
  if(code === 102) {
    return false;
  }
  //null
  if(code === 110) {
    return null;
  }
  //number
  if((code >= 48 && code <= 57) || code === 45) {
    return Number(json);
  }
  //array
  if(code === 91) {
    var array = json.split('');
    var newArray = [];
    for(var i=0; i<array.length-1; i++) {
      var value = array[i];
      var previous = array[i-1];
      var next = array[i+1];
      if(isSyntax(value) === false) {
        if(isSyntax(previous)===true) {
          newArray.unshift(value);
        }
        else if(isSyntax(previous) === false) {
          newArray[0] += (value);
        }
      }
    }
    return newArray.map(function(x) {
      return parseJSON(x)
    }).reverse();
  }
  //object
  if(code === 123) {
    var array = json.split('');
    var newArray = [];
    var object = {};
    for(var i=0; i<array.length-1; i++) {
      var value = array[i];
      var previous = array[i-1];
      var next = array[i+1];
      if(isSyntax(value) === false) {
        if(isSyntax(previous)===true) {
          newArray.unshift(value);
        }
        else if(isSyntax(previous) === false) {
          newArray[0] += (value);
        }
      }
    }
    var objectArray = newArray.map(function(x) {
      return parseJSON(x)
    }).reverse();
    for(var i=0; i<objectArray.length; i=i+2) {
      object[objectArray[i]] = objectArray[i+1];
    }
    return object;
  }
  else {
    return undefined;
  }
};

//checks array/object syntax
var isSyntax = function(string) {
  var n = string.charCodeAt();
  if(n === 91 || n === 44 || n === 93 || n === 123 || n === 125 || n === 58) {
    return true;
  }
  else{
    return false;
  }
}