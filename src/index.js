import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { Router } from "react-router-dom"
import { routerMiddleware } from "react-router-redux"
import App from "./containers/App.js"
import reducers from "./reducers/reducers.js"
import { setAccessTokenUnplash } from "./unsplash/unsplash.js"
import { createBrowserHistory } from "history"

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min"
import "./css/button.css"
import "./css/components.css"
import "./css/App.css"

const initialState = []

const history = createBrowserHistory()
const middleware = routerMiddleware(history)

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(middleware)
)

const code = window.location.search.split("code=")[1]

if (code) {
  setAccessTokenUnplash(code)
  history.push("/photos")
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
)
