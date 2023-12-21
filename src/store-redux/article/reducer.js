// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
  lastError: ''
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article/load-start":
      return {...state, data: {}, waiting: true};

    case "article/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "article/load-error":
      return {...state, data: {}, waiting: false, lastError: action.payload.error};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
