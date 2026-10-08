import { listTextContent } from "./moovappsPlatform.js";

let birthdayPeopleRequest = null;

function readableValue(value) {
  if (Array.isArray(value)) return value.map(readableValue).filter(Boolean).join(", ");
  if (!value || typeof value !== "object") return String(value || "").trim();
  return readableValue(
    value.label
    || value.name
    || value.title
    || value.value
    || value.displayName
    || value.sys_Title
    || ""
  );
}

export function normalizeBirthdayPeople(records = []) {
  return records
    .map((record, index) => ({
      id: String(record?.sys_CurrentResourceId || record?.sys_Reference || record?.id || `birthday-${index}`),
      name: readableValue(record?.sys_Title),
      affectation: readableValue(record?.Affectation),
    }))
    .filter((person) => person.name);
}

export function loadBirthdayPeople() {
  if (!birthdayPeopleRequest) {
    birthdayPeopleRequest = listTextContent("birthdays")
      .then(({ data }) => normalizeBirthdayPeople(data))
      .catch((error) => {
        birthdayPeopleRequest = null;
        throw error;
      });
  }
  return birthdayPeopleRequest;
}
