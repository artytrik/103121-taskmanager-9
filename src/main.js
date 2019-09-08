import {Menu} from './components/menu.js';
import {Search} from './components/search.js';
import {Filter} from './components/filters.js';
import {Statistics} from './components/statistics.js';
import {getFilters} from './data.js';
import {getCard} from './data.js';
import {filterNames} from './data.js';
import {render} from './utils.js';
import {Position} from './utils.js';
import {BoardController} from './controllers/board.js';
import { SearchController } from './controllers/search.js';

const CARD_COUNT = 16;

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

export let cards = new Array(CARD_COUNT).fill(``).map(getCard);
const filters = filterNames.map(getFilters);

const filter = new Filter(filters);
const menu = new Menu();
const search = new Search();
const statistics = new Statistics();
const onDataChange = (tasks) => {
  cards = tasks;
}
statistics.getElement().classList.add(`visually-hidden`);

render(mainControl, menu.getElement(), Position.BEFOREEND);
render(main, search.getElement(), Position.BEFOREEND);
render(main, filter.getElement(), Position.BEFOREEND);
render(main, statistics.getElement(), Position.BEFOREEND);

const taskListController = new BoardController(main, onDataChange);

const onSearchBackButtonClick = () => {
  statistics.getElement().classList.add(`visually-hidden`);
  searchController.hide();
  taskListController.show(cards);
}

const searchController = new SearchController(main, search, onSearchBackButtonClick)

taskListController.show(cards);

menu.getElement().addEventListener(`change`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `INPUT`) {
    return;
  }

  switch (evt.target.id) {
    case `control__task`:
      statistics.getElement().classList.add(`visually-hidden`);
      searchController.hide();
      taskListController.show(cards);
      break;
    case `control__statistic`:
      taskListController.hide();
      searchController.hide();
      statistics.getElement().classList.remove(`visually-hidden`);
      break;
    case `control__new-task`:
      taskListController.createTask();
      taskListController.show(cards);
      menu.getElement().querySelector(`#control__task`).checked = true;
      break;
  }
});

search.getElement().addEventListener(`click`, () => {
  statistics.getElement().classList.add(`visually-hidden`);
  taskListController.hide();
  searchController.show(cards);
})



