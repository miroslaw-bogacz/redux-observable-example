import {
  FETCH_PEOPLE_LIST,
  FETCH_PEOPLE_LIST_ERROR,
  FETCH_PEOPLE_LIST_SUCCESS,
} from './people.actions';
import { selectReducer } from '../../core/helpers/select-reducer.helper';

const initialState = {
  isPending: false,
  models: [],
  errors: []
};

const fetchPeopleListReducer = (_) => (state) => ({
  ...state,
  isPending: true,
});

const fetchPeopleListSuccessReducer = (action) => (state) => ({
  ...state,
  isPending: false,
  models: action.payload,
});

const fetchPeopleListErrorReducer = (action) => (state) => ({
  ...state,
  isPending: false,
  errors: action.payload,
});

const reducers = {
  [FETCH_PEOPLE_LIST]: fetchPeopleListReducer,
  [FETCH_PEOPLE_LIST_SUCCESS]: fetchPeopleListSuccessReducer,
  [FETCH_PEOPLE_LIST_ERROR]: fetchPeopleListErrorReducer,
};

export function peopleListReducers(state = initialState, action) {
  const reducer = selectReducer(reducers, action.type);
  return reducer(action)(state);
}
