export const getOverdueFilterCount = (cards) => cards.reduce((acc, {dueDate}) =>
  (new Date(Date.now()).getDate() > new Date(dueDate).getDate() ? acc + 1 : acc), 0);

export const getTodayFilterCount = (cards) => cards.reduce((acc, {dueDate}) =>
  (new Date(Date.now()).getDate() === new Date(dueDate).getDate() ? acc + 1 : acc), 0);

export const getFavouritesFilterCount = (cards) => cards.reduce((acc, {isFavourite}) =>
  (isFavourite ? acc + 1 : acc), 0);

export const getArchiveFilterCount = (cards) => cards.reduce((acc, {isArchive}) =>
  (isArchive ? acc + 1 : acc), 0);

export const getRepeatingFilterCount = (cards) => cards.reduce((acc, {repeatingDays}) =>
  (Object.keys(repeatingDays).some(day => repeatingDays[day]) ? acc + 1 : acc), 0);
