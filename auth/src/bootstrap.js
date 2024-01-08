//Mount function to start up the app
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';
// createBrowserHistory is used in development and isolation
// createMemoryHistory is used in production and container
// createBrowserHistory allows developers in development mode to use the browser history object
// so that they can see the url change in the browser

const mount = (el, { onNavigate, defaultHistory, onSignIn }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [window.location.pathname],
      // window.location.pathname is the current pathname of the container app
      // this is now the initial pathname for the child app
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }
  // whenever the url changes, call onNavigate
  // and onNavigate will be called with the new pathname
  // and we will update the container's current pathname
  // with the new pathname

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
        // this updates the browser history object in container app
      }
    },
  };
};

//If we are in development and in isolation,
// call mount immediately

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// Otherwise, we are running through container
// and export mount function so container can use it wherever it wants
export { mount };
