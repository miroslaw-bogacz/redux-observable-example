export function selectReducer(reducers, action) {
  const x = () => (state) => state;
  return reducers[action] || x;
}