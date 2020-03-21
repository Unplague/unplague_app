import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './App'
import { addRegion } from './actions'
import { Region } from './model/Region'

export const store = createStore(rootReducer)

store.dispatch(addRegion(new Region("Europe", 741_400_000, 0.05, 2, 100)))
store.dispatch(addRegion(new Region("Asia", 741_400_000, 0.05, 2, 100)))
store.dispatch(addRegion(new Region("North America", 741_400_000, 0.05, 2, 100)))
store.dispatch(addRegion(new Region("South America", 741_400_000, 0.05, 2, 100)))


render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


