import { FC, useEffect, useState } from "react";
import { getDetails, Todo } from "./service";

interface ServiceState {
  loading: boolean;
  error: string | undefined;
  attempt: number;
}

interface DetailsProps {}

const Details: FC<DetailsProps> = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const [serviceState, setServiceState] = useState<ServiceState>({
    loading: false,
    error: undefined,
    attempt: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        debugger;
        if (
          !serviceState.loading &&
          !serviceState.attempt &&
          !serviceState.error
        ) {
          setServiceState({ ...serviceState, loading: true });
          const detailsResponse = await getDetails();
          setServiceState({
            ...serviceState,
            attempt: serviceState.attempt + 1,
            loading: false,
          });
          setTodoList(detailsResponse.data);
        }
      } catch (e) {
        setServiceState({
          ...serviceState,
          attempt: serviceState.attempt + 1,
          loading: false,
          error: e,
        });
      }
    })();
  }, [serviceState]);

  return (
    <div>
      <h4 data-testid="heading">Todo List</h4>
      {serviceState.loading && <div data-testid="loader">Loading...</div>}
      {todoList.length && (
        <div
          data-testid="todoList"
          style={{
            overflowY: "auto",
            height: "250px",
            border: "black solid 1px",
          }}
        >
          {todoList.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </div>
      )}
    </div>
  );
};

export default Details;
