import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import Landing from './components/Landing';
import Pricing from './components/Pricing';

export default () => {
  return (
    <>
      <h1>Marketing microfrontend!</h1>
      <div>
        <StylesProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/pricing" component={Pricing} />
              <Route exact path="/" component={Landing} />
            </Switch>
          </BrowserRouter>
        </StylesProvider>
      </div>
    </>
  );
};
