import {Board} from "../components/board.js";
import {TaskList} from "../components/task-list";
import {EmptyResult} from "../components/empty-result.js";
import {LoadButton} from '../components/load-button.js';
import {Sort} from '../components/sort.js';
import {render} from '../utils.js';
import {unrender} from '../utils.js';
import {Position} from '../utils.js';
import {TaskController} from './task.js';

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._emptyResult = new EmptyResult();
    this._loadButton = new LoadButton();
    this._sort = new Sort();

    this._subscriptions = [];
		this._onChangeView = this._onChangeView.bind(this);
		this._onDataChange = this._onDataChange.bind(this);
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

  _renderCard(task) {
    const taskController = new TaskController(this._taskList, task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;

    this._renderBoard(this._tasks);
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
