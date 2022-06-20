import { RepositoryPort } from "../../../src/ports/adapters/repository/RepositoryPort";
import { analyseJobUseCase } from "../../../src/useCase/analyseJobUseCase";
import {
  RepositoryError,
  RepositoryErrorStatusCode,
} from "../../../src/ports/adapters/repository/RepositoryError";

const fakeRepository = (): jest.Mocked<RepositoryPort> => ({
  write: jest.fn(),
  read: jest.fn(),
});

describe("Analyse Job Use Case", () => {
  let response: "Success" | RepositoryError;
  const fakeRepo = fakeRepository();
  describe("Given we have a valid request", () => {
    response = analyseJobUseCase(fakeRepo, ["=", "=", "some request"]);
    it("should call the repo and write the data", () => {
      expect(fakeRepo.write).toHaveBeenCalledWith("some request");
    });
    it("should return success", () => {
      expect(response).toBe("Success");
    });
  });
  describe("error handling", () => {
    let response: "Success" | RepositoryError;
    it("should return an error when the repo fails", () => {
      fakeRepo.write.mockReturnValue(
        new RepositoryError(RepositoryErrorStatusCode.WRITE_ERROR)
      );
      response = analyseJobUseCase(fakeRepo, [
        "=",
        "=",
        "some request",
      ]) as RepositoryError;
      expect(response.message).toBe("UNABLE_TO_WRITE_DATA");
      expect(response.name).toBe("Error");
    });
  });
});
