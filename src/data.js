import {getOverdueFilterCount} from './utils.js';
import {getTodayFilterCount} from './utils.js';
import {getFavouritesFilterCount} from './utils.js';
import {getArchiveFilterCount} from './utils.js';
import {getRepeatingFilterCount} from './utils.js';
import {cards} from './main.js';

export const filterNames = [`all`, `overdue`, `today`, `favourites`, `repeating`, `tags`, `archive`];

export const getCard = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  repeatingDays: {
    'Mo': Boolean(Math.round(Math.random())),
    'Tu': Boolean(Math.round(Math.random())),
    'We': Boolean(Math.round(Math.random())),
    'Th': Boolean(Math.round(Math.random())),
    'Fr': Boolean(Math.round(Math.random())),
    'Sa': Boolean(Math.round(Math.random())),
    'Su': Boolean(Math.round(Math.random()))
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

