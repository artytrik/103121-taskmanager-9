import {getOverdueFilterCount} from './util.js';
import {getTodayFilterCount} from './util.js';
import {getFavouritesFilterCount} from './util.js';
import {getArchiveFilterCount} from './util.js';
import {getRepeatingFilterCount} from './util.js';

const filterNames = [`all`, `overdue`, `today`, `favourites`, `repeating`, `tags`, `archive`];

const CARD_COUNT = 3;

export const getCard = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  repeatingDays: {
    'Mo': false,
    'Tu': false,
    'We': false,
    'Th': Boolean(Math.round(Math.random())),
    'Fr': false,
    'Sa': false,
    'Su': false,
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ]),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavourite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

export const getFilters = (filterName) => (
  {
    title: filterName,
    count: getFilterCount(filterName, cards)
  }
);

const getFilterCount = (name, cards) => {
  const filterValues = {
    'all': cards.length,
    'overdue': getOverdueFilterCount(cards),
    'today': getTodayFilterCount(cards),
    'favourites': getFavouritesFilterCount(cards),
    'repeating': getRepeatingFilterCount(cards),
    'tags': cards.length,
    'archive': getArchiveFilterCount(cards)
  };

  return filterValues[name];
};

export const cards = new Array(CARD_COUNT).fill(``).map(getCard);

export const filters = filterNames.map(getFilters);
