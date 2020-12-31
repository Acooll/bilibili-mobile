import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import './App.styl';

import Index from './pages/Index'
import Video from './pages/Video'
import Search from './pages/Search'
import My from './pages/My'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={null}>
          <Switch>
            <Route path='/index' component={Index} />
            <Route path='/video' component={Video} />
            <Route path='/search' component={Search} />
            <Route path='/my' component={My} />
            <Redirect to="/index" />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
