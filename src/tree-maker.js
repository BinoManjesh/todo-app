function make(tagName, attributes, children = []) {
  const element = document.createElement(tagName);
  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  for (const child of children) {
    element.appendChild(child);
  }
  return element;
}

function makeText(tagName, text, attributes) {
  const element = document.createElement(tagName);
  element.textContent = text;
  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  return element;
}

export { make, makeText };
