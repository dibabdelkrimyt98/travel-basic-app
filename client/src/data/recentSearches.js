// client/src/data/recentSearches.js
const STORAGE_KEY = 'travel_recent_searches';

export const getRecentSearches = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveSearch = (query) => {
  if (!query || query.trim() === '') return;
  
  let searches = getRecentSearches();
  // Remove duplicate and keep only the last 5
  searches = [query, ...searches.filter(s => s !== query)].slice(0, 5);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
  return searches;
};

export const clearSearches = () => {
  localStorage.removeItem(STORAGE_KEY);
  return [];
};