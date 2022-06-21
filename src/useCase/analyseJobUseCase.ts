import { RepositoryPort } from "../ports/adapters/repository/RepositoryPort";
import { RepositoryError } from "../ports/adapters/repository/RepositoryError";
import { Request } from "../ports/entrypoint/analyseJobsPort";
import { sanitiseRequest } from "../domain/sanitiseRequest";

export function analyseJobUseCase(
  repository: RepositoryPort,
  request: Request
): "Success" | RepositoryError {
  const data = sanitiseRequest(request);

  const response = repository.write(data);

  if (response instanceof RepositoryError) {
    return response;
  }
  return "Success";
}
