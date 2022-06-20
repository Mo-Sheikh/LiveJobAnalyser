import * as fs from "fs";
import { RepositoryPort } from "../../../src/ports/adapters/repository/RepositoryPort";
import { FileSystemRepository } from "../../../src/adapters/FileSystemRepository";
import { RepositoryError } from "../../../src/ports/adapters/repository/RepositoryError";

describe("Given we have a repository", () => {
  const testPath = "./testOutput.json";
  let repository: RepositoryPort;
  describe("And we want to read from the repo", () => {
    beforeAll(() => {
      fs.writeFileSync(testPath, `{"test":1}`, "utf-8");
      repository = new FileSystemRepository(testPath);
    });
    afterAll(() => {
      fs.unlinkSync(testPath);
    });
    it("should read data from the repository", async () => {
      const data = await repository.read();

      expect(data).toStrictEqual({
        test: 1,
      });
    });
  });
  describe("and we want to write to the repo", () => {
    beforeAll(() => {
      fs.writeFileSync(testPath, `{}`, "utf-8");
      repository = new FileSystemRepository(testPath);
    });
    afterAll(() => {
      fs.unlinkSync(testPath);
    });

    it("should write into the repo", async () => {
      await repository.write("test");
      const readData = fs.readFileSync(testPath, "utf-8");
      const parsedData = JSON.parse(readData);
      expect(parsedData).toStrictEqual({ test: 0 });
    });
  });
  describe("Error Handling", () => {
    let repository: RepositoryPort;
    describe("Given we have an error when reading from the repo", () => {
      beforeAll(() => {
        repository = new FileSystemRepository("path that does not exist");
      });
      it("should return a READ_ERROR", () => {
        const response = repository.read() as RepositoryError;
        expect(response.name).toBe("Error");
        expect(response.message).toBe("UNABLE_TO_READ_DATA");
      });
    });
  });
});
