const initialData = {
  count: 0,
  items: []
}

export const initialState = {
  data: initialData,
  parentId: null,
  waiting: false,
  lastPostedComment: {},
  lastError: ''
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: initialData, parentId: action.payload.parentId, waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return {...state, data: initialData, parentId: null, waiting: false};

    case "comments/post-start":
      return {...state, waiting: true}

    case "comments/post-success":
      return {
        ...state,
        data: {items: [...state.data.items, action.payload.data], count: state.data.count + 1},
        waiting: false,
        lastPostedComment: action.payload.data
      }

    case "comments/post-error":
      console.error(action.payload.error);
      return {...state, lastError: action.payload.error, waiting: false}

    default:
      return state;
  }
}

export default reducer;
