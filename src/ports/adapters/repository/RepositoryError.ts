export enum RepositoryErrorStatusCode {
    WRITE_ERROR= "UNABLE_TO_WRITE_DATA"
}


export class RepositoryError extends Error{
    constructor(name: RepositoryErrorStatusCode) {
        super(name);
    }
}