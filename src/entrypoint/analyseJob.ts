import { Response } from "../ports/entrypoint/analyseJobsPort";
import { FileSystemRepository } from "../adapters/FileSystemRepository";
import { analyseJobUseCase } from "../useCase/analyseJobUseCase";
import { RepositoryError } from "../ports/adapters/repository/RepositoryError";

export const analyseJob = (request: any): Response => {
  console.log("received");
  const repository = new FileSystemRepository("./jobs.json");
  const response = analyseJobUseCase(repository, request);
  if (response instanceof RepositoryError) {
    return {
      status: 500,
    };
  }
  return { status: 200 };
};

analyseJob(process.argv);
