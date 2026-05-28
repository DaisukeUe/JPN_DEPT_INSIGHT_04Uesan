import { render, screen } from "@testing-library/react";
import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest";
import userEvent from "@testing-library/user-event";
import Login from "../components/Login";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import deptRedeucer from "../slices/deptSlice";
import dataRedeuser from "../slices/dataSlice";
import loginReducer from "../slices/loginSlice";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const server = setupServer(
  http.get(`${import.meta.env.VITE_API_URL}/users`, () => {
    return HttpResponse.json([{ id: 1, name: "testuser" }]);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Login", () => {
  describe("usernameが入力できること", () => {
    test("testuserが表示されること", async () => {
      const user = userEvent.setup();
      const testStore = configureStore({
        reducer: {
          user: userReducer,
          dept: deptRedeucer,
          data_body: dataRedeuser,
          login: loginReducer,
        },
      });
      render(
        <Provider store={testStore}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
          ,
        </Provider>,
      );
      const el = screen.getByRole("textbox");
      await user.type(el, "testuser");
      expect((el as HTMLInputElement).value).toBe("testuser");
    });
  });
});
