import { RepositoryPort } from "../../../src/ports/adapters/repository/RepositoryPort";
import { analyseJobUseCase } from "../../../src/useCase/analyseJobUseCase";

const fakeRepository = (): jest.Mocked<RepositoryPort> => ({
  write: jest.fn(),
  read: jest.fn(),
});
describe("Analyse Job Use Case", () => {
  const fakeRepo = fakeRepository();
  describe("Given we have a valid request", () => {
    beforeAll(() => {
      analyseJobUseCase(fakeRepo, "some request");
    });
    it("should call the repo and write the data", () => {
      expect(fakeRepo.write).toHaveBeenCalledWith("some request");
    });
  });
});
