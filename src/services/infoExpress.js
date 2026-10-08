import { listTextContent } from "./moovappsPlatform.js";

let infoExpressRequest = null;

export function normalizeInfoExpress(records = []) {
  return records
    .map((record, index) => ({
      id: String(record?.sys_CurrentResourceId || record?.sys_Reference || record?.id || `info-express-${index}`),
      title: String(record?.sys_Title || "").trim(),
    }))
    .filter((item) => item.title);
}

export function loadInfoExpress() {
  if (!infoExpressRequest) {
    infoExpressRequest = listTextContent("infoexpress")
      .then(({ data }) => normalizeInfoExpress(data))
      .catch((error) => {
        infoExpressRequest = null;
        throw error;
      });
  }
  return infoExpressRequest;
}
