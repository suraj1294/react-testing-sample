import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import { getDetails, Todo } from "./service";
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

describe("api service test", () => {
  test("Calls the GET method as expected", async () => {
    mockedAxios.get.mockReturnValueOnce(
      Promise.resolve<AxiosResponse<Todo[]>>(AxiosSuccessResponseMock)
    );
    const result = await getDetails();
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.data).toBe(mockTodoResult);
  });

  test("Calls the GET method as expected", async () => {
    mockedAxios.get.mockReturnValueOnce(
      Promise.reject<AxiosResponse<Todo[]>>(AxiosFailResponseMock)
    );
    try {
      await getDetails();
    } catch (err) {
      expect(err).not.toBeUndefined();
    }
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  test("returns the title of the first album", async () => {
    mockedAxios.get.mockResolvedValue({
      data: mockTodoResult,
    } as { data: Todo[] });
    const response = await getDetails();
    expect(response.data[0].title).toEqual("title1");
  });
});
