import { Request, Response } from "../ports/entrypoint/analyseJobsPort";
import { FileSystemRepository } from "../adapters/FileSystemRepository";
import { analyseJobUseCase } from "../useCase/analyseJobUseCase";
import { RepositoryError } from "../ports/adapters/repository/RepositoryError";

export const analyseJob = (request: Request): Response => {
  const repository = new FileSystemRepository("./jobs.json");
  const response = analyseJobUseCase(repository, request);
  if (response instanceof RepositoryError) {
    return {
      status: 500,
    };
  }
  return { status: 200 };
};
