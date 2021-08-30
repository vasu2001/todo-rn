import moment, { Moment } from "moment";

export interface todoItem {
   title: string;
   tag: string;
   completed: boolean;
   timestamp: Moment;
   id: number;
}

export interface StoreType {
   todos: todoItem[];
   tags: string[];
}

export const initStore: StoreType = {
   todos: [
      {
         title: "Study Math",
         tag: "Default",
         completed: false,
         timestamp: moment(),
         id: 0,
      },
   ],
   tags: ["Default", "Study", "play", "random"],
};

export interface ReduxAction {
   type: string;
   payload: any;
}

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const NEW_TAG = "NEW_TAG";
