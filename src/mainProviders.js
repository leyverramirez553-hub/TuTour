import React from 'react';
import { html } from './jsx.js';

export function Providers({ children }) {
  return html`<${React.Fragment}>${children}</${React.Fragment}>`;
}