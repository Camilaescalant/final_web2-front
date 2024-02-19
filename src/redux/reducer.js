import actionCreators from "./action-creators";
const { HOME } = actionCreators;
const initialState = {
  flag: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case HOME:
      return {
        ...state,
        flag: action.payload,
      };
    default:
      return { ...state };
  }
}

export default reducer;
