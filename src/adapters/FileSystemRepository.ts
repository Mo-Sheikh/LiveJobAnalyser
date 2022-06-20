import {
  KeywordData,
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
    const words = new Set(request.split(" ").map((i) => i.toLowerCase()));
    let state = false;
    for (const word of words) {
      for (let i = 0; i < currentData.length; i++) {
        const item = currentData[i];
        if (item.term.toLowerCase() === word.toLowerCase()) {
          currentData[i].value += 1;
          state = true;
        }
      }
      if (!state) {
        currentData.push({
          term: word.toLowerCase(),
          value: 1,
        });
      }
    }

    //sort - ideally should unit test
    currentData.sort((a: KeywordData, b: KeywordData) => {
      return b.value - a.value;
    });

    fs.writeFileSync(this.path, JSON.stringify(currentData), "utf-8");
    return "Success";
  }
}
