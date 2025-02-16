const initialState = {
  configurations: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONFIGURATION':
      return {
        ...state,
        configurations: [...state.configurations, action.payload],
      };
    case 'DELETE_CONFIGURATION':
      return {
        ...state,
        configurations: state.configurations.filter((config, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
