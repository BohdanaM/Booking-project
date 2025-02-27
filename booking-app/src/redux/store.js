import { createStore, applyMiddleware, combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import rootReducer from "./reducer.js";

const history = createBrowserHistory();

const { routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: history,
});

const store = createStore(
  combineReducers({
    router: routerReducer,
    app: rootReducer,
  }),
  applyMiddleware(routerMiddleware)
);

export { store, history };
