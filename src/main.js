import {getMenu} from './components/menu.js';
import {getSearch} from './components/search.js';
import {makeFilters} from './components/filters.js';
import {getCardContainer} from './components/card-container.js';
import {makeCard} from './components/card.js';
import {getEditCard} from './components/edit-card.js';
import {getLoadButton} from './components/load-button.js';
import {cards} from './data.js';
import {filters} from './data.js';

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

const renderComponent = (container, layout) => {
  container.insertAdjacentHTML(`beforeend`, layout);
};

renderComponent(mainControl, getMenu());
renderComponent(main, getSearch());
renderComponent(main, makeFilters(filters));
renderComponent(main, getCardContainer());

const board = main.querySelector(`.board`);
const boardTasks = board.querySelector(`.board__tasks`);

renderComponent(boardTasks, getEditCard());

renderComponent(boardTasks, cards.map(makeCard).join(``));

renderComponent(board, getLoadButton());
