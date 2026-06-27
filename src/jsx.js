import React from 'react';
import htm from 'htm';
export const html = htm.bind((type, ...rest) => React.createElement(type || React.Fragment, ...rest));