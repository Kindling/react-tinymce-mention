import React from 'react';

export default function renderComponent(component) {
  return React.renderToStaticMarkup(component);
}
