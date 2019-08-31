import {Board} from "../components/board.js";
import {TaskList} from "../components/task-list";
import {EmptyResult} from "../components/empty-result.js";
import {Card} from '../components/card.js';
import {EditCard} from '../components/edit-card.js';
import {LoadButton} from '../components/load-button.js';
import {Sort} from '../components/sort.js';
import {render} from '../utils.js';
import {unrender} from '../utils.js';
import {Position} from '../utils.js';

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._emptyResult = new EmptyResult();
    this._loadButton = new LoadButton();
    this._sort = new Sort();
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Position.AFTERBEGIN);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    if (this._tasks.length > 0) {
      render(this._board.getElement(), this._loadButton.getElement(), Position.BEFOREEND);
      this._tasks.forEach((task) => this._renderCard(task));
    } else {
      render(this._board, this._emptyResult.getElement(), Position.BEFOREEND);
    }

    this._sort.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderBoard(tasks) {
    unrender(this._taskList.getElement());

    this._taskList.removeElement();
    render(this._sort.getElement(), this._taskList.getElement(), Position.AFTEREND);
    tasks.forEach((task) => this._renderCard(task));
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
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const formData = new FormData(taskEdit.getElement().querySelector(`.card__form`));

        const entry = {
          description: formData.get(`text`),
          color: formData.get(`color`),
          tags: new Set(formData.getAll(`hashtag`)),
          dueDate: new Date(formData.get(`date`)),
          repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
            acc[it] = true;
            return acc;
          }, {
            'mo': false,
            'tu': false,
            'we': false,
            'th': false,
            'fr': false,
            'sa': false,
            'su': false,
          })
        };

        this._tasks[this._tasks.findIndex((it) => it === card)] = entry;

        this._renderBoard(this._tasks);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._taskList.getElement(), task.getElement(), Position.BEFOREEND);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((taskMock) => this._renderCard(taskMock));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((taskMock) => this._renderCard(taskMock));
        break;
      case `default`:
        this._tasks.forEach((taskMock) => this._renderCard(taskMock));
        break;
    }
  }
}
