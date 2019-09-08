import {Board} from "../components/board.js";
import {TaskList} from "../components/task-list";
import {EmptyResult} from "../components/empty-result.js";
import {LoadButton} from '../components/load-button.js';
import {Sort} from '../components/sort.js';
import {render} from '../utils.js';
import {unrender} from '../utils.js';
import {Position} from '../utils.js';
import {TaskListController} from './task-list.js';

const TASKS_IN_ROW = 4;
export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = [];
    this._board = new Board();
    this._taskList = new TaskList();
    this._emptyResult = new EmptyResult();
    this._loadButton = new LoadButton();
    this._sort = new Sort();
    this._showedTasks = TASKS_IN_ROW;

    this._taskListController = new TaskListController(this._taskList
      .getElement(), this._onDataChange.bind(this));

    this._init();
  }

  hide() {
    this._board.getElement().classList.add(`visually-hidden`);
  }

  show(tasks) {
    if (tasks !== this._tasks) {
      this._setTasks(tasks);
    }

    this._board.getElement().classList.remove(`visually-hidden`);
  }

  createTask() {
    this._taskListController.createTask();
  }

  _init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Position.AFTERBEGIN);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    this._sort.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderBoard() {
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    unrender(this._loadButton.getElement());
    this._loadButton.removeElement();
    if (this._showedTasks < this._tasks.length) {
      render(this._board.getElement(), this._loadButton.getElement(), Position.BEFOREEND);
    }
    this._taskListController.setTasks(this._tasks.slice(0, this._showedTasks));
    this._loadButton.getElement()
      .addEventListener(`click`, () => this._onLoadButtonClick());
  }

  _setTasks(tasks) {
    this._tasks = tasks;
    this._showedTasks = TASKS_IN_ROW;

    this._renderBoard();
  }

  _onDataChange(tasks) {
    this._tasks = tasks;

    this._renderBoard();
  }

  _onLoadButtonClick() {
    this._taskListController.addTasks(this._tasks.slice(this._showedTasks,
      this._showedTasks + TASKS_IN_ROW));

    this._showedTasks += TASKS_IN_ROW;

    if (this._showedTasks >= this._tasks.length) {
      unrender(this._loadButton.getElement());
      this._loadButton.removeElement();
    }
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
        this._taskListController.setTasks(sortedByDateUpTasks);
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        this._taskListController.setTasks(sortedByDateDownTasks)
        break;
      case `default`:
        this._taskListController.setTasks(this._tasks);
        break;
    }
  }
}
