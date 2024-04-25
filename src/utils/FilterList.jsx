import React from 'react';

const filterList = (originalList, filters) => {
  return originalList.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (key === 'name') {
        // Case-insensitive check for name filter
        return item[key].toLowerCase().includes(value.toLowerCase());
      }
      return item[key] === value;
    });
  });
};


export default filterList;