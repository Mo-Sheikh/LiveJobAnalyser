import {RepositoryError} from "./RepositoryError";

export type RepositorySchema  = Record<string, number>

export interface RepositoryPort  {
    write: (request: string)=> Promise<"Success"| RepositoryError>
    read: ()=> RepositorySchema| RepositoryError
}
