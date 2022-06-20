import { Request } from "../ports/entrypoint/analyseJobsPort";
import { FileSystemRepository } from "../adapters/FileSystemRepository";
import { analyseJobUseCase } from "../useCase/analyseJobUseCase";

export const analyseJob = (_request: Request) => {
  const repository = new FileSystemRepository("./jobs.json");
  return analyseJobUseCase(repository);
};
