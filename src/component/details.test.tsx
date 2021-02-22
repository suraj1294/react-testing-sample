import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import Details from "./details";
import axios, { AxiosResponse } from "axios";
import { Todo } from "./service";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockTodoResult = [
  {
    userId: "test1",
    id: 1,
    title: "title1",
    completed: true,
  },
  {
    userId: "test2",
    id: 2,
    title: "title2",
    completed: false,
  },
] as Todo[];

interface mockError {
  errors: {
    code: string;
    text: string;
  }[];
}

const AxiosSuccessResponseMock: AxiosResponse<Todo[]> = {
  headers: {},
  config: {},
  status: 200,
  statusText: "ok",
  data: mockTodoResult,
};

const AxiosFailResponseMock: AxiosResponse<mockError> = {
  headers: {},
  config: {},
  status: 400,
  statusText: "ok",
  data: {
    errors: [
      {
        code: "some code",
        text: "some error text",
      },
    ],
  },
};

afterEach(cleanup);

it("it should render todo list", async () => {
  mockedAxios.get.mockReturnValueOnce(
    Promise.resolve<AxiosResponse<Todo[]>>(AxiosSuccessResponseMock)
  );

  render(<Details />);

  expect(screen.getByTestId("loader")).toBeInTheDocument();

  await waitFor(() => screen.getByTestId("todoList"));

  const ListContainerDivElement = screen.getByTestId("todoList");

  expect(ListContainerDivElement).toBeInTheDocument();
});
