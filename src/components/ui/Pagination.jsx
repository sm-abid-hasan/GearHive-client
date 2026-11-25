"use client";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;


  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  const numbers = [];
  for (let number = start; number <= end; number++) numbers.push(number);

  return (
    <nav className="mt-10 flex justify-center" aria-label="Pagination">
      <div className="join">
        <button
          type="button"
          className="btn join-item"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          «
        </button>
        {numbers.map((number) => (
          <button
            key={number}
            type="button"
            className={`btn join-item ${number === page ? "btn-primary" : ""}`}
            onClick={() => onPageChange(number)}
            aria-current={number === page ? "page" : undefined}
          >
            {number}
          </button>
        ))}
        <button
          type="button"
          className="btn join-item"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          »
        </button>
      </div>
    </nav>
  );
}
