import {Menu} from './components/menu.js';
import {Search} from './components/search.js';
import {Filter} from './components/filters.js';
import {CardContainer} from './components/card-container.js';
import {Card} from './components/card.js';
import {EditCard} from './components/edit-card.js';
import {LoadButton} from './components/load-button.js';
import {cards} from './data.js';
import {filters} from './data.js';
import {render} from './utils.js';
import {Position} from './utils.js';
import { EmptyResult } from './components/empty-result.js';

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

const filter = new Filter(filters);
const cardContainer = new CardContainer();
const menu = new Menu();
const loadButton = new LoadButton();
const search = new Search();
const emptyResult = new EmptyResult();

render(mainControl, menu.getElement(), Position.BEFOREEND);
render(main, search.getElement(), Position.BEFOREEND);

render(main, filter.getElement(), Position.BEFOREEND);
render(main, cardContainer.getElement(), Position.BEFOREEND);

const board = main.querySelector(`.board`);
const boardTasks = board.querySelector(`.board__tasks`);

const renderCard = (card) => {
  const task = new Card(card);
  const taskEdit = new EditCard(card);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      boardTasks.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      boardTasks.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    })

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    })

  taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      boardTasks.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    })

  render(boardTasks, task.getElement(), Position.BEFOREEND);
};

if (cards.length > 0) {
  cards.forEach((card) => renderCard(card));
} else {
  render(boardTasks, emptyResult.getElement(), Position.BEFOREEND);
}


render(board, loadButton.getElement(), Position.BEFOREEND);
