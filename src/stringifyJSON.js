// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if (Array.isArray(obj)) {
    if(obj.length > 0) {
      var string = '';
      obj.forEach(function(x) {
        string += (x).toString() + ',';
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
        if (obj[key] !== undefined && typeof obj[key] !== 'function') {
          string += key.toString() + ':' + obj[key].toString() + ',';
        }
      }
      string = string.slice(0, string.length-1);
      return `{${string}}`;
    }
    else {
      return '{}';
    }
  }
  else {
    if (typeof obj === 'string') {
      return `'${obj}'`;
    }
    else {
      return '' + obj;
    }
  }
};
