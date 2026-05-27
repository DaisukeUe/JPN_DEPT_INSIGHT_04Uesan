import { expect, should } from "chai";
import { db } from "../knex";
import { viewsFunction } from "../view/views";
import { viewsRepository } from "../view/viewsRepository";
import { describe } from "mocha";
import { before } from "mocha";
import config from "../knexfile";
import crypto from "crypto";
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
  const { getUsers, fetchDaily, createUser, loginAuth, getDeptValue } =
    viewsRepository();

  describe("userList", () => {
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
  });
  describe("createUser", () => {
    it("should return created a new user", async () => {
      const solt = crypto.randomBytes(6).toString("hex");
      const newUser = {
        user_id: 3,
        user_name: "test_name3",
        password: "123456",
        solt: String(solt),
      };
      const soltPassword = `${solt}${newUser.password}`;
      const hash = crypto.createHash("sha256");
      const hashPassword = hash.update(soltPassword).digest("hex");
      console.log(hashPassword);
      newUser.password = hashPassword;
      const reslut = await createUser(newUser);
      console.log(newUser, reslut[0]);
      expect(newUser.user_id).equal((reslut[0] as any).user_id);
      expect(newUser.user_name).equal((reslut[0] as any).user_name);
      expect(newUser.solt).equal((reslut[0] as any).solt);
      expect(newUser.password).equal((reslut[0] as any).password);
    });
  });

  describe("userLogin", () => {
    it("should return login user", async () => {
      const result = await loginAuth(3, "123456");
      console.log(result);
      expect(3).equal((result[0] as any).user_id);
      expect("test_name3").equal((result[0] as any).user_name);
    });
  });

  describe("getDeptValue", () => {
    it("should return userDeptValu", async () => {
      const result = await getDeptValue(2);
      console.log(result);
      expect(result).to.be.an("array");
    });
  });

  describe("jpgDaily", () => {
    it("shold return array of graphData", async () => {
      const data_body = await fetchDaily(20210101, 20220101, "10yjpy.b", "d");
      expect(data_body).to.be.an("array");
    });
  });
});
