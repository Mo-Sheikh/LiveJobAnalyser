import {RepositoryError} from "./RepositoryError";

export interface RepositoryPort  {
    write: (request: string)=> Promise<"Success"| RepositoryError>
}
