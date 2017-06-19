// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var code = json.charCodeAt()
  //string
  if(code === 34) {
    return json.slice(1, json.length-1);
  }
  //boolean
  if(code === 116 || code === 102) {
    return Boolean(json);
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
    var array = json.split('')
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
  
  //undefined - change to else?
  else {
    return undefined;
  }
};

//helper function to check array syntax
var isSyntax = function(string) {
  var n = string.charCodeAt();
  if(n === 91 || n === 44 || n === 93) {
    return true;
  }
  else{
    return false;
  }
}
