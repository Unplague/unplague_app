import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './App'
import { addRegion } from './actions'
import { Region } from './model/Region'

import defaultData from './data/defaultData.json';

export const store = createStore(rootReducer)

defaultData.data.map((item, index) => {
  store.dispatch(addRegion(new Region(item.name, item.population)));
})

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


