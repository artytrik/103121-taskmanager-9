import {createElement} from '../utils.js';

export class EmptyResult {
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<p class="result__empty">no matches found...</p>`;
  }
}
