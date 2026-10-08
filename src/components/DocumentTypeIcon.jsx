import React from "react";
import { getDocumentFileKind } from "../services/gedDocuments.js";
import LucideIcon from "./LucideIcon.jsx";

const IMAGE_TYPES = new Set(["JPG", "PNG", "GIF", "WEBP", "SVG", "BMP"]);
const WORD_TYPES = new Set(["DOC", "DOCX"]);
const SHEET_TYPES = new Set(["XLS", "XLSX", "CSV"]);
const PRESENTATION_TYPES = new Set(["PPT", "PPTX"]);

function getTypePresentation(kind) {
  if (kind === "PDF") return { icon: "file-text", tone: "pdf" };
  if (IMAGE_TYPES.has(kind)) return { icon: "image", tone: "image" };
  if (WORD_TYPES.has(kind)) return { icon: "file-text", tone: "word" };
  if (SHEET_TYPES.has(kind)) return { icon: "file-spreadsheet", tone: "sheet" };
  if (PRESENTATION_TYPES.has(kind)) return { icon: "presentation", tone: "presentation" };
  return { icon: "file", tone: "generic" };
}

export default function DocumentTypeIcon({ documentItem, size = "large", className = "" }) {
  const kind = getDocumentFileKind(documentItem);
  const presentation = getTypePresentation(kind);

  return (
    <span
      className={`document-type-icon document-type-icon--${size} document-type-icon--${presentation.tone}${className ? ` ${className}` : ""}`}
      title={`Fichier ${kind}`}
      aria-label={`Fichier ${kind}`}
    >
      <LucideIcon name={presentation.icon} />
      <span className="document-type-icon__label" aria-hidden="true">{kind}</span>
    </span>
  );
}
