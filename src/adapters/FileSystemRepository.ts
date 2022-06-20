import {
  RepositoryPort,
  RepositorySchema,
} from "../ports/adapters/repository/RepositoryPort";
import {
  RepositoryError,
  RepositoryErrorStatusCode,
} from "../ports/adapters/repository/RepositoryError";
import * as fs from "fs";

export class FileSystemRepository implements RepositoryPort {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  read(): RepositorySchema | RepositoryError {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (e) {
      return new RepositoryError(RepositoryErrorStatusCode.READ_ERROR);
    }
  }

  write(_request: string): Promise<"Success" | RepositoryError> {
    // const currentData = this.read();

    // for (const word of request) {
    //   currentData[word];
    // }
    return Promise.resolve("Success");
  }
}
