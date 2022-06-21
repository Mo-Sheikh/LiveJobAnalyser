import { Request } from "../ports/entrypoint/analyseJobsPort";

export function sanitiseRequest(request: Request) {
  return request.replace(/\n/g, " ").replace(/[^a-zA-Z\d\s:]/g, "");
}
