import React, { useEffect, useMemo, useState } from "react";

export const DOCUMENTS_PAGE_SIZE = 10;

export default function PaginatedDocuments({ items = [], resetKey = "", pageSize = DOCUMENTS_PAGE_SIZE, children }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  useEffect(() => {
    if (page !== currentPage) setPage(currentPage);
  }, [currentPage, page]);

  const visibleItems = useMemo(
    () => items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [currentPage, items, pageSize],
  );

  useEffect(() => {
    window.lucide?.createIcons();
  }, [currentPage, items.length, pageSize]);

  return (
    <>
      {children(visibleItems)}
      {totalPages > 1 ? (
        <div className="cmr-position-pagination cmr-document-pagination">
          <button type="button" onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Page précédente">
            <i data-lucide="chevron-left" /> Précédent
          </button>
          <span>Page <strong>{currentPage}</strong> sur {totalPages}</span>
          <button type="button" onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Page suivante">
            Suivant <i data-lucide="chevron-right" />
          </button>
        </div>
      ) : null}
    </>
  );
}
