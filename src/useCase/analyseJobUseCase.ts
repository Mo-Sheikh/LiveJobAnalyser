import { RepositoryPort } from "../ports/adapters/repository/RepositoryPort";

export function analyseJobUseCase(repository: RepositoryPort, request: string) {
  repository.write(request);
}
