let listAncestorElements = x => 
    x.parentElement ? [x.parentElement, ...listAncestorElements(x.parentElement)]
  :                   []

module.exports = listAncestorElements
