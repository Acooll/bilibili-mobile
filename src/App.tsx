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
import Space from './pages/Space'
import Live from './pages/Live'
import LiveRoom from './pages/LiveRoom'
import LivesArea from './pages/LivesArea'
import Channel from './pages/Channel'

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
            <Route path='/lives' component={Live} />
            <Route path='/live_room' component={LiveRoom} />
            <Route path='/lives_area' component={LivesArea} />
            <Route path='/space' component={Space} />
            <Route path='/channel' component={Channel} />
            <Redirect to="/index" />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
