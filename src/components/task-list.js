import {AbstractComponent} from './abstract-component.js';

export class TaskList extends AbstractComponent {
  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}
