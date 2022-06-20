import {RepositoryPort, RepositorySchema} from "../ports/adapters/repository/RepositoryPort";
import {RepositoryError} from "../ports/adapters/repository/RepositoryError";
import * as fs from "fs";

export class FileSystemRepository implements RepositoryPort {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    read(): RepositorySchema | RepositoryError {
        const data = fs.readFileSync(this.path, "utf-8")
        const parsedData = JSON.parse(data)
        return parsedData
    }

    write(_request: string): Promise<"Success" | RepositoryError> {
        return Promise.resolve("Success")

    }
}