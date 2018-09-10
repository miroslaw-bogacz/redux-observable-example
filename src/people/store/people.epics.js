import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, map, catchError, pluck, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { FETCH_PEOPLE_LIST, fetchPeopleListError, fetchPeopleListSuccess } from './people.actions';

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
