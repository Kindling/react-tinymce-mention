import ReactDomServer from 'react-dom/server'

export default function renderComponent(component) {
  return ReactDomServer.renderToStaticMarkup(component);
}
