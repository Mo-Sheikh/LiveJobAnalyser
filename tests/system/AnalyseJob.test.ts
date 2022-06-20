import {analyseJob} from "../../src/entrypoint/analyseJob";

describe("Given we have a connection to the service", ()=>{
    it("should return void", ()=>{
        const response = analyseJob(["_", "_", "some text"]);
        expect(response).toBe("Success")
    })
})