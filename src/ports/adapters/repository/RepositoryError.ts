export enum RepositoryErrorStatusCode {
    WRITE_ERROR= "UNABLE_TO_WRITE_DATA",
    READ_ERROR="UNABLE_TO_READ_DATA"
}


export class RepositoryError extends Error{
    constructor(name: RepositoryErrorStatusCode) {
        super(name);
    }
}