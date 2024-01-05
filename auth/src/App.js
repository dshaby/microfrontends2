import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import SignIn from './components/Signin';
import SignUp from './components/Signup';

const generateClassName = createGenerateClassName({
  productionPrefix: 'au', // a = auth app this is to avoid css class name collision
  //it adds the 'au' prefix to all the css class names
});

export default ({ history }) => {
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Switch>
          <Route path="/auth/signin" component={<SignIn />} />
          <Route path="/auth/signup" component={<SignUp />} />
        </Switch>
      </StylesProvider>
    </Router>
  );
};
