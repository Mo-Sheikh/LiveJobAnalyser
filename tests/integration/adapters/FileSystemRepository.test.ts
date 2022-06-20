import * as fs from "fs";
import {RepositoryPort} from "../../../src/ports/adapters/repository/RepositoryPort";

describe("Given we have a repository", ()=>{
    const testPath = "./testOutput.json"
    let repository: RepositoryPort
    beforeAll(()=>{
        fs.writeFileSync(testPath, "{test:1}")
        repository = new FileSystemRepository(testPath)
    })
    it("should read data from the repository", async () => {
        const data = await repository.read()
        expect(data).toBe({test: 1})
    })
})