const actionCreators = {
  HOME: "HOME",
  myHeroe: function () {
    return async (dispatch) => {
      dispatch({
        type: "HOME",
        payload: true,
      });
    };
  },
  allHeroe: function () {
    return async (dispatch) => {
      dispatch({
        type: "HOME",
        payload: false,
      });
    };
  },
};

export default actionCreators;
