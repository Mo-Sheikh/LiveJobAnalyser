import * as fs from "fs";

describe("Given we have a repository", ()=>{
    const testPath = "./testOutput.json"
    let repository: RepositoryPort
    beforeAll(()=>{
        fs.writeFileSync(testPath, "{}")
        repository = new FileSystemRepository(testPath)
    })
    it("should write data into the repository", async () => {
        await repository.write("node react postgresQL")
        const data = fs.readFileSync(testPath, "utf-8")
        expect(data).toBe({node: 1, react: 1, postgresQL: 1})
    })
})