import React, { useEffect, useMemo, useState } from "react";
import { icons } from "lucide";

export const DOCUMENTS_PAGE_SIZE = 10;

function PaginationIcon({ name }) {
  const iconNode = icons[name];
  if (!iconNode) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconNode.map(([tag, attributes], index) => React.createElement(tag, { ...attributes, key: `${tag}-${index}` }))}
    </svg>
  );
}

export default function PaginatedDocuments({ items = [], resetKey = "", pageSize = DOCUMENTS_PAGE_SIZE, children }) {
  const [page, setPage] = useState(1);
  const [jumpPage, setJumpPage] = useState("1");
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  useEffect(() => {
    setPage(1);
    setJumpPage("1");
  }, [resetKey]);

  useEffect(() => {
    if (page !== currentPage) setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => {
    setJumpPage(String(currentPage));
  }, [currentPage]);

  const goToPage = (event) => {
    event.preventDefault();
    const requestedPage = Math.floor(Number(jumpPage));
    if (!Number.isFinite(requestedPage)) return;
    setPage(Math.min(Math.max(requestedPage, 1), totalPages));
  };

  const visibleItems = useMemo(
    () => items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [currentPage, items, pageSize],
  );

  return (
    <>
      {children(visibleItems)}
      {totalPages > 1 ? (
        <div className="cmr-position-pagination cmr-document-pagination">
          <button type="button" onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Page précédente">
            <PaginationIcon name="ChevronLeft" /> Précédent
          </button>
          <span>Page <strong>{currentPage}</strong> sur {totalPages}</span>
          <form className="cmr-pagination-jump" onSubmit={goToPage}>
            <label>
              Aller à
              <input
                type="number"
                min="1"
                max={totalPages}
                value={jumpPage}
                onChange={(event) => setJumpPage(event.target.value)}
                aria-label="Numéro de page"
              />
            </label>
            <button type="submit">Aller</button>
          </form>
          <button type="button" onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Page suivante">
            Suivant <PaginationIcon name="ChevronRight" />
          </button>
        </div>
      ) : null}
    </>
  );
}
