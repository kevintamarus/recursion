// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var documentBody = document.body;
  var finalArray = [];
  var search = function(node) {
    if(node.classList && node.classList.contains(className)) {
      finalArray.push(node);
    }
    node = node.firstChild;
    while(node) {
      search(node);
      node = node.nextSibling;
    }
  }
  search(documentBody);
  return finalArray;
};