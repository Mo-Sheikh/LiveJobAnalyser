import { RepositoryPort } from "../../../src/ports/adapters/repository/RepositoryPort";
import { analyseJobUseCase } from "../../../src/useCase/analyseJobUseCase";
import {
  RepositoryError,
  RepositoryErrorStatusCode,
} from "../../../src/ports/adapters/repository/RepositoryError";
import { sanitiseRequest } from "../../../src/domain/sanitiseRequest";

const fakeRepository = (): jest.Mocked<RepositoryPort> => ({
  write: jest.fn(),
  read: jest.fn(),
});
jest.mock("../../../src/domain/sanitiseRequest");
//read up on this

describe("Analyse Job Use Case", () => {
  const mockedSanitiseRequest = sanitiseRequest as jest.MockedFunction<
    typeof sanitiseRequest
  >;
  mockedSanitiseRequest.mockReturnValue("sanitised string");
  let response: "Success" | RepositoryError;
  let fakeRepo = fakeRepository();

  describe("Given we have a valid request", () => {
    const badRequest = `fake request with () ))\n\n\n`;
    response = analyseJobUseCase(fakeRepo, badRequest);

    it("should sanitise the request", () => {
      expect(mockedSanitiseRequest).toHaveBeenCalledWith(badRequest);
    });
    it("should call the repo and write the data", () => {
      expect(fakeRepo.write).toHaveBeenCalledWith("sanitised string");
    });
    it("should return success", () => {
      expect(response).toBe("Success");
    });
  });
  describe("error handling", () => {
    beforeAll(() => {});
    it("should return an error when the repo fails", () => {
      fakeRepo.write.mockReturnValue(
        new RepositoryError(RepositoryErrorStatusCode.WRITE_ERROR)
      );
      response = analyseJobUseCase(fakeRepo, "some request") as RepositoryError;
      expect(response.message).toBe("UNABLE_TO_WRITE_DATA");
      expect(response.name).toBe("Error");
    });
  });
});
