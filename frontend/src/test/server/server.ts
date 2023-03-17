import { setupServer } from "msw/node";
import { resetDb } from "./db";
import { handlers } from "./handlers";

const server = setupServer(...handlers);

export const setupTestServer = () => {
  beforeAll(() => server.listen());
  afterEach(async () => {
    resetDb()
    server.resetHandlers()
  });
  afterAll(() => server.close());
};
