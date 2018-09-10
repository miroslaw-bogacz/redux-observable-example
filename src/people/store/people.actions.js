import { createAction } from '../../core/helpers/create-action.helper';

export const FETCH_PEOPLE_LIST = '[People]: fetch list';
export const FETCH_DARK_SIDE_OF_THE_FORCE_PEOPLE = '[People]: dark side';
export const FETCH_PEOPLE_LIST_SUCCESS = '[People]: fetch list success';
export const FETCH_PEOPLE_LIST_ERROR = '[People]: fetch list error';

export const fetchPeopleList = createAction(FETCH_PEOPLE_LIST);
export const fetchDarkSideOfTheForcePeople = createAction(FETCH_DARK_SIDE_OF_THE_FORCE_PEOPLE);
export const fetchPeopleListSuccess = createAction(FETCH_PEOPLE_LIST_SUCCESS);
export const fetchPeopleListError = createAction(FETCH_PEOPLE_LIST_ERROR);
