import * as React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  wait
} from "react-testing-library";
import { createStore } from "redux";
import "jest-dom/extend-expect";
import { PeopleContainer } from "./people.container";
import { Provider } from "react-redux";
import { peopleListReducers } from "../store/people.reducers";
import * as Actions from "../store/people.actions";

function renderWithRedux(
  ui,
  { initialState, store = createStore(peopleListReducers, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

const initialState = {
  peopleList: {
    isPending: false,
    models: [
      {
        name: "Test name",
        height: "Test height",
        mass: "Test mass",
        hair_color: "Test hair_color",
        gender: "gender"
      },
      {
        name: "name",
        height: "height",
        mass: "mass",
        hair_color: "hair_color",
        gender: "gender"
      }
    ],
    errors: []
  }
};

afterEach(cleanup);

describe("PeopleContainer", () => {
  describe("when component is rendered", () => {
    it("should display initial people list", () => {
      const { getByTestId } = renderWithRedux(<PeopleContainer />, {
        initialState
      });
      expect(getByTestId("people-collection").childElementCount).toBe(2);
    });
  });

  describe("when component did mount", () => {
    it("should dispatch fetchPeopleList action", () => {
      jest.spyOn(Actions, "fetchPeopleList");
      renderWithRedux(<PeopleContainer />, { initialState });
      expect(Actions.fetchPeopleList).toHaveBeenCalledWith("");
    });
  });

  describe("when search name is changed", () => {
    it("should dispatch fetchPeopleList action with value", () => {
      jest.spyOn(Actions, "fetchPeopleList");
      const { getByPlaceholderText } = renderWithRedux(<PeopleContainer />, {
        initialState
      });
      fireEvent.change(getByPlaceholderText("find by name"), {
        target: { value: "Luke" }
      });
      expect(Actions.fetchPeopleList).toHaveBeenCalledWith("Luke");
    });
  });

  describe("when button fetch dark side is clicked", () => {
    it("should dispatch fetchDarkSideOfTheForcePeople action", () => {
      jest.spyOn(Actions, "fetchDarkSideOfTheForcePeople");
      const { getByTestId } = renderWithRedux(<PeopleContainer />, {
        initialState
      });
      fireEvent.click(getByTestId("button-fetch-dark-side"));
      expect(Actions.fetchDarkSideOfTheForcePeople).toHaveBeenCalledWith(
        "Darth Vader"
      );
    });
  });

  describe("when `isPending` is true", () => {
    it("should display pending text", async () => {
      jest.spyOn(Actions, "fetchDarkSideOfTheForcePeople");
      const { getByTestId } = renderWithRedux(<PeopleContainer />, {
        initialState: {
          peopleList: { ...initialState.peopleList, isPending: true }
        }
      });
      await wait(() => expect(getByTestId("pending-text")).toBeTruthy());
    });
  });
});
