/**
 *
 * @param {string} tagName
 * @param {object} attributes
 * @returns {HTMLElement}
 */
export function createCustomElement({ tagName, attributes = {} }) {
  const customElement = document.createElement(tagName);
  for (const [attribute, value] of Object.entries(attributes)) {
    if (value !== null) customElement.setAttribute(attribute, value);
  }
  return customElement;
}

/**
 *
 * @param {string} id
 * @returns {DocumentFragment}
 */
export function cloneTemplate(id) {
  const fragment = document.querySelector(`#${id}`).content.cloneNode(true);
  return fragment;
}
