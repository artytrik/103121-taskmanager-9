import {createElement} from '../utils.js';

export class LoadButton {
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
