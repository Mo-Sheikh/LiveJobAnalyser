import * as fs from "fs";
import {RepositoryPort} from "../../../src/ports/adapters/repository/RepositoryPort";
import {FileSystemRepository} from "../../../src/adapters/FileSystemRepository";

describe("Given we have a repository", () => {
    const testPath = "./testOutput.json"
    let repository: RepositoryPort
    beforeAll(() => {
        fs.writeFileSync(testPath, `{"test":1}`, 'utf-8')
        repository = new FileSystemRepository(testPath)
    })
    afterAll(() => {
        fs.unlinkSync(testPath)
    })
    it("should read data from the repository", async () => {
        const data = await repository.read()

        expect(data).toStrictEqual({
            "test": 1
        })
    })
})