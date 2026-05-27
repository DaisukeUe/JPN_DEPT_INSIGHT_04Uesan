import { expect } from "chai";
import { db } from "../knex";
import { viewsFunction } from "../view/views";
import { viewsRepository } from "../view/viewsRepository";
import { describe } from "mocha";
import { before } from "mocha";
import config from "../knexfile";
const USERS_TABLE = "users";
const DEPT_TABLE = "dept_value";

describe("views", () => {
  let userRepo;
  let deptRepo;

  before(async () => {
    await db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback(config, true))
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .catch(console.error);
  });
  const { getUsers, fetchDaily } = viewsRepository();

  describe("userView", () => {
    it("should return array of users", async () => {
      const usersList = await getUsers();
      console.log(usersList);
      expect(usersList).to.be.an("array");
    });

    it("should have expected props", async () => {
      const usersList = await getUsers();
      usersList.forEach((user) => {
        expect(user).to.exist;
        expect(user).to.have.property("user_id");
        expect(user).to.have.property("user_name");
        expect(user).to.have.property("password");
        expect(user).to.have.property("solt");
      });
    });

    it("shold return array of graphData", async () => {
      const data_body = await fetchDaily(20210101, 20220101, "10yjpy.b", "d");
      expect(data_body).to.be.an("array");
    });
  });
});
