export function createAction(type) {
  return (payload) => payload ? ({ type, payload }) : ({ type });
}
