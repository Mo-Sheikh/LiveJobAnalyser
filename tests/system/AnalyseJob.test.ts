import { analyseJob } from "../../src/entrypoint/analyseJob";

jest.mock("../../src/adapters/FileSystemRepository.ts");
describe("Given we have a connection to the service", () => {
  it("should return void", () => {
    const response = analyseJob("some text");
    expect(response.status).toBe(200);
  });
});
