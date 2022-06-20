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

  write(request: string): "Success" | RepositoryError {
    const currentData = this.read();
    if (currentData instanceof RepositoryError) {
      return currentData;
    }

    for (const word of request.split(" ")) {
      currentData[word] = currentData[word] ? (currentData[word] += 1) : 0;
    }

    fs.writeFileSync(this.path, JSON.stringify(currentData), "utf-8");
    return "Success";
  }
}
