import { fetchPeopleListEpic, fetchPeopleListEpicWithoutDebounceTime } from './people.epics';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { fetchPeopleList, fetchPeopleListSuccess } from './people.actions';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';

describe('fetchPeopleListEpic', () => {

  const mockResponse = {
    response: {
      results: [{
        name: 'Test name',
        age: 1,
      }, {
        name: 'Test name 2',
        age: 2,
      }, {
        name: 'Test name 3',
        age: 3,
      }]
    }
  };

  beforeEach(() => {
    spyOn(ajax, 'get').and.returnValue(of(mockResponse));
  });

  describe('when will be called with debounceTime', () => {
    it('should return response with people', () => {
      const action = hot('a', { a: fetchPeopleList('Luke') });
      const received = fetchPeopleListEpic(action, null, getTestScheduler(), 10);
      const expected = cold('-a', { a: fetchPeopleListSuccess(mockResponse.response.results) });

      expect(received).toBeObservable(expected);
      expect(ajax.get).toHaveBeenCalledWith('https://swapi.co/api/people?search=Luke');
    });
  });

  describe('when will be called 3 times with debounceTime', () => {
    it('should call ajax.get one time', () => {
      const action = hot('a-b-c', {
        a: fetchPeopleList('Luke'),
        b: fetchPeopleList('Luke 2'),
        c: fetchPeopleList('Luke 3'),
      });

      const received = fetchPeopleListEpic(action, null, getTestScheduler(), 30);

      const expected = cold('-------c', { c: fetchPeopleListSuccess(mockResponse.response.results) });

      expect(received).toBeObservable(expected);
      expect(ajax.get).toHaveBeenCalledTimes(1);
      expect(ajax.get).toHaveBeenCalledWith('https://swapi.co/api/people?search=Luke 3');
    });
  });

  describe('when will be called without debounceTime', () => {
    it('should return response with people', () => {
      const action = hot('a', { a: fetchPeopleList('Luke') });
      const received = fetchPeopleListEpicWithoutDebounceTime(action);
      const expected = cold('a', { a: fetchPeopleListSuccess(mockResponse.response.results) } );

      expect(received).toBeObservable(expected);
      expect(ajax.get).toHaveBeenCalledWith('https://swapi.co/api/people?search=Luke');
    });
  });

});
