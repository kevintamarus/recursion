// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if (typeof obj === 'string') {
    return '"' + obj + '"';
  }
  else if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
    return '' + obj;
  } 
  if (Array.isArray(obj)) {
    if(obj.length > 0) {
      var string = '';
      obj.forEach(function(x) {
        string += stringifyJSON(x) + ',';
      });
      string = string.slice(0, string.length-1);
      return `[${string}]`;
    }
    else {
      return '[]';
    }
  }
  if (typeof obj === 'object') {
    if(Object.keys(obj).length > 0) {
      var string = '';
      for(var key in obj) {
        var value = obj[key];
        if (value !== undefined && typeof value !== 'function') {
          string += stringifyJSON(key) + ':' + stringifyJSON(value) + ',';
        }
        else {
          return '{}';
        }
      }
      string = string.slice(0, string.length-1);
      return `{${string}}`;
    }
    else {
      return '{}';
    }
  }
};
