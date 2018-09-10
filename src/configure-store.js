import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { fetchPeopleListEpic, fetchDarkSideOfTheForcePeople } from './people/store/people.epics';
import { peopleListReducers } from './people/store/people.reducers';

const epics = combineEpics(
  fetchPeopleListEpic,
  fetchDarkSideOfTheForcePeople
);

const reducers = combineReducers({
  peopleList: peopleListReducers,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

export function configureStore() {
  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(epics);

  return store;
}
