import {AbstractComponent} from './abstract-component.js';

export class EmptyResult extends AbstractComponent {
  constructor () {
    super();
  }

  getTemplate() {
    return `<p class="result__empty">no matches found...</p>`;
  }
}
