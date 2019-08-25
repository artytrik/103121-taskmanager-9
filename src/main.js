import {Menu} from './components/menu.js';
import {Search} from './components/search.js';
import {Filter} from './components/filters.js';
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

render(mainControl, menu.getElement(), Position.BEFOREEND);
render(main, search.getElement(), Position.BEFOREEND);
render(main, filter.getElement(), Position.BEFOREEND);

boardController.init();



