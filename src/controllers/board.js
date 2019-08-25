import {Board} from "../components/board.js";
import {TaskList} from "../components/task-list";
import {EmptyResult} from "../components/empty-result.js";
import {Card} from '../components/card.js';
import {EditCard} from '../components/edit-card.js';
import {LoadButton} from '../components/load-button.js';
import {render} from '../utils.js';
import {Position} from '../utils.js';

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._emptyResult = new EmptyResult();
    this._loadButton = new LoadButton();
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    if (this._tasks.length > 0) {
      render(this._board.getElement(), this._loadButton.getElement(), Position.BEFOREEND);
      this._tasks.forEach((task) => this._renderCard(task));
    } else {
      render(this._board, this._emptyResult.getElement(), Position.BEFOREEND);
    }
  }

  _renderCard(card) {
    const task = new Card(card);
    const taskEdit = new EditCard(card);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._taskList.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    task.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskEdit.getElement(), task.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._taskList.getElement(), task.getElement(), Position.BEFOREEND);
  }
}
