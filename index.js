const fs = require('fs').promises;

function select(selector) {

  var xmlString = document.body.innerHTML;
  var doc = new DOMParser().parseFromString(xmlString, 'text/html');

  let selectorItems = selector.split(' ');

  if (selectorItems.length > 1) {
    return applyMultipleSelectors(doc.body, selectorItems);

  } else {
    return selectAll(doc.body, selector);
  }
}


function applyMultipleSelectors(htmlRootElement, selectors) {
  let result = [];

  selectors.forEach((selector, index) => {

    if (index === 0) {
      result = selectAll(htmlRootElement, selector);
 
    } else {
      let temp = [];

      result.forEach(item => {
        temp.push(...selectAll(item, selector));
      });

      result = temp;
     
    }
  });
  return result;
}

function matchElement(element, selector) {

  let selectorIdChainList = selector.split('#');
  if(selectorIdChainList.length>1 && selectorIdChainList[0])
  {
    return (
      (element && element.tagName === selectorIdChainList[0].toUpperCase())&&
      (element.id === selectorIdChainList[1])
    );
  }

  let selectorClassChainList = selector.split('.');
  if(selectorClassChainList.length>1 && selectorClassChainList[0])
  {
    return (
      (element && element.tagName === selectorClassChainList[0].toUpperCase()) &&
      element.classList.contains(selectorClassChainList[1])
    );

  }

  return (
    (element && element.tagName === selector.toUpperCase()) ||
    element.classList.contains(selector.substr(1)) ||
    (selector.charAt(0) === '#' && element.id === selector.substr(1))
  );

 
}
  


function selectAll(htmlRootElement, selector) {
  let elementsResult = [];

  IterateDomElement(htmlRootElement, elementsResult, selector);

  return elementsResult;
}


function IterateDomElement(element, elements, selector) {
  if (!element || !element.childNodes) return;
  for (let i = 0; i < element.childNodes.length; i++) {
    let currentElement = element.children[i];
    if (currentElement) {
      if (matchElement(currentElement, selector)) {
        elements.push(currentElement);
      }
      if (currentElement.childNodes.length > 0) {
        IterateDomElement(currentElement, elements, selector);
      }
    }
  }
}

module.exports = select;
