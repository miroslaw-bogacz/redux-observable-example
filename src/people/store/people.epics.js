import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, map, exhaustMap, catchError, pluck, debounceTime, throttleTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { FETCH_PEOPLE_LIST, FETCH_DARK_SIDE_OF_THE_FORCE_PEOPLE, fetchPeopleListError, fetchPeopleListSuccess } from './people.actions';

export const fetchPeopleListEpic = (actions, store, scheduler, time = 300) => actions
  .pipe(
    ofType(FETCH_PEOPLE_LIST),
    pluck('payload'),
    debounceTime(time, scheduler),
    switchMap((payload = '') => ajax
      .get(`https://swapi.co/api/people?search=${payload}`)
      .pipe(
        pluck('response', 'results'),
        map(fetchPeopleListSuccess),
        catchError((error) => of(fetchPeopleListError(error)))
      )
    )
  );

// It is only example how to test epic with out debounce time
export const fetchPeopleListEpicWithoutDebounceTime = (actions) => actions
  .pipe(
    ofType(FETCH_PEOPLE_LIST),
    pluck('payload'),
    switchMap((payload) => ajax
      .get(`https://swapi.co/api/people?search=${payload}`)
      .pipe(
        pluck('response', 'results'),
        map(fetchPeopleListSuccess),
        catchError((error) => of(fetchPeopleListError(error)))
      )
    )
  );

export const fetchDarkSideOfTheForcePeople = (actions) => actions
  .pipe(
    ofType(FETCH_DARK_SIDE_OF_THE_FORCE_PEOPLE),
    pluck('payload'),
    throttleTime(1000),
    exhaustMap((payload) => ajax
      .get(`https://swapi.co/api/people?search=${payload}`)
      .pipe(
        pluck('response', 'results'),
        map(fetchPeopleListSuccess),
        catchError((error) => of(fetchPeopleListError(error)))
      )
    )
  );
