import { RepositoryError } from "./RepositoryError";

export type RepositorySchema = Array<KeywordData>;

export interface KeywordData {
  term: string;
  value: number;
}

export interface RepositoryPort {
  write: (request: string) => "Success" | RepositoryError;
  read: () => RepositorySchema | RepositoryError;
}
