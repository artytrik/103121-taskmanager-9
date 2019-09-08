import {Menu} from './components/menu.js';
import {Search} from './components/search.js';
import {Filter} from './components/filters.js';
import {Statistics} from './components/statistics.js';
import {filters} from './data.js';
import {cards} from './data.js';
import {render} from './utils.js';
import {Position} from './utils.js';
import {BoardController} from './controllers/board.js';

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

const filter = new Filter(filters);
const menu = new Menu();
const search = new Search();
const boardController = new BoardController(main, cards);
const statistics = new Statistics();
statistics.getElement().classList.add(`visually-hidden`);

render(mainControl, menu.getElement(), Position.BEFOREEND);
render(main, search.getElement(), Position.BEFOREEND);
render(main, filter.getElement(), Position.BEFOREEND);
render(main, statistics.getElement(), Position.BEFOREEND);

boardController.init();

menu.getElement().addEventListener(`change`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `INPUT`) {
    return;
  }

  switch (evt.target.id) {
    case `control__task`:
      statistics.getElement().classList.add(`visually-hidden`);
      boardController.show();
      break;
    case `control__statistic`:
      boardController.hide();
      statistics.getElement().classList.remove(`visually-hidden`);
      break;
  }
});



