import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import './App.styl';

import Index from './pages/Index'

function App() {
  return (
    <Router>
      <Suspense fallback={null}>
        <Switch>
          <Route path='/index' component={Index} />
          <Redirect to="/index" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
