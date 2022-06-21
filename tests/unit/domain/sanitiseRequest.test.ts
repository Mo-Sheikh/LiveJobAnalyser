import { sanitiseRequest } from "../../../src/domain/sanitiseRequest";

describe("Sanitise Request", () => {
  describe("Given we have a valid request", function () {
    it("should sanitise the request", () => {
      const sanitisedRequest = sanitiseRequest("Bad request\n\n(){}");
      expect(sanitisedRequest).toBe("Bad request  ");
    });
  });
});
