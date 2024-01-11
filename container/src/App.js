import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import Header from './components/Header';
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));
import Progress from './components/Progress';
import { createBrowserHistory } from 'history';

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      {/* BrowserRouter internally creates an instance of browser history for us
      We need to get access to that history instance to redirect the user to the dashboard after signing in
      We can do that by creating our own history object and passing it to the router
      to programatically redirect user around app. Whenever value of isSignedIn changes, we can redirect user to dashboard
      
      to get access to history created by BrowserRouter is challenging if trying to get access to history in the 
      same component where you create BrowserRouter. 
      Create history manually with a generic router, which copy we want to use.
     */}
      <StylesProvider generateClassName={generateClassName}>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <DashboardLazy />
            </Route>
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};
