import {
   ADD_TODO,
   COMPLETE_TODO,
   DELETE_TODO,
   initStore,
   NEW_TAG,
   ReduxAction,
   StoreType,
} from "./utils";

const Reducer = (state = initStore, action: ReduxAction): StoreType => {
   const newState = { ...state };
   switch (action.type) {
      case ADD_TODO:
         newState.todos = [...state.todos, action.payload];
         return newState;

      case COMPLETE_TODO:
         const idx = newState.todos.findIndex((x) => x.id === action.payload);
         newState.todos[idx].completed = !newState.todos[idx].completed;
         return newState;

      case DELETE_TODO:
         newState.todos = newState.todos.filter((x) => x.id != action.payload);
         return newState;

      case NEW_TAG:
         newState.tags = [...state.tags, action.payload];
         return newState;
   }

   return state;
};

export default Reducer;
