import { RepositoryPort } from "../ports/adapters/repository/RepositoryPort";
import { RepositoryError } from "../ports/adapters/repository/RepositoryError";
import { Request } from "../ports/entrypoint/analyseJobsPort";

export function analyseJobUseCase(
  repository: RepositoryPort,
  request: Request
): "Success" | RepositoryError {
  const data = request[2];
  const response = repository.write(data);

  if (response instanceof RepositoryError) {
    return response;
  }
  return "Success";
}
