import React from 'react';
import htm from 'htm';

const withStableKeys = (child, path = 'k') => {
  if (!Array.isArray(child)) return child;
  return child.map((item, index) => {
    const childPath = `${path}-${index}`;
    if (Array.isArray(item)) return withStableKeys(item, childPath);
    if (React.isValidElement(item) && item.key == null) {
      return React.cloneElement(item, { key: childPath });
    }
    return item;
  });
};

const createElement = (type, props, ...children) => React.createElement(type || React.Fragment, props, ...children.map((child, index) => withStableKeys(child, `c-${index}`)));

export const html = htm.bind(createElement);
