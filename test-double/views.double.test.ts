import sinon from "sinon";
import sinonChai from "sinon-chai";
import { viewsFunction } from "../view/views";
import chai from "chai";
import { expect } from "chai";
chai.use(sinonChai);

const { usersView } = viewsFunction();

describe("viewsFunctions with sinon", () => {
  afterEach(() => sinon.restore());

  describe("usersView", () => {
    it("stub: usersView()がデータを返す", async () => {
      const row = {
        // user_id: 1,
        user_name: "test_name3",
        password: "123456",
        solt: "123456",
      };
      const userDouble = { usersView: async (): Promise<any> => {} };
      const stub = sinon.stub(userDouble, "usersView");
      stub.resolves(row);
      const result = await userDouble.usersView();
      expect(result.user_name).to.equal("test_name3");
      expect(result).to.deep.equal(row);
      expect(stub.calledOnce).to.be.true;
    });
  });
});
