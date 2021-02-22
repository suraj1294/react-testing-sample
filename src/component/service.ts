import axios, { AxiosPromise } from "axios";

export interface Todo {
    
        userId: string,
        id: number;
        title: string;
        completed: boolean;
      
}

export const getDetails = ():AxiosPromise<Todo[]> => {
    return axios.get("https://jsonplaceholder.typicode.com/todos")
}