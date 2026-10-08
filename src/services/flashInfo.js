import { listTextContent, platformFileUrl } from "./moovappsPlatform.js";
import { extractDownloadReference, readableContentValue } from "./contentValues.js";

let flashInfoRequest = null;

export function normalizeFlashInfo(records = []) {
  return records
    .map((record, index) => {
      const title = readableContentValue(record?.sys_Title);
      const description = readableContentValue(record?.Description);
      const imageReference = extractDownloadReference(record?.Image);
      return {
        id: String(record?.sys_CurrentResourceId || record?.sys_Reference || record?.id || `flash-info-${index}`),
        category: "Flash Infos",
        text: title,
        title,
        description,
        image: imageReference ? platformFileUrl(imageReference) : "",
      };
    })
    .filter((item) => item.text);
}

export function applyFlashInfo(items = []) {
  const data = window.CMR_DATA?.data;
  if (!data) return;

  data.cmrNewsItems = items;
  const flashSection = (data.communicationInterneSections || [])
    .find((section) => section.id === "flash-info");
  if (flashSection) {
    flashSection.items = items.map((item) => ({
      id: item.id,
      title: item.title,
      meta: item.description,
      kind: "INFO",
      image: item.image,
    }));
  }
}

export function loadFlashInfo() {
  if (!flashInfoRequest) {
    flashInfoRequest = listTextContent("flashinfo")
      .then(({ data }) => normalizeFlashInfo(data))
      .catch((error) => {
        flashInfoRequest = null;
        throw error;
      });
  }
  return flashInfoRequest;
}
