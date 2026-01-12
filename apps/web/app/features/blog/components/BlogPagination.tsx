import Link from 'next/link';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export function BlogPagination({
  currentPage,
  totalPages,
  basePath = '/blog',
}: {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="rounded border border-gray-300 p-2 hover:bg-gray-100"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      )}

      {pages.map((pageNum) => (
        <Link
          key={pageNum}
          href={`${basePath}?page=${pageNum}`}
          className={`rounded px-3 py-1 font-medium ${
            pageNum === currentPage
              ? 'bg-blue-500 text-white'
              : 'border border-gray-300 hover:bg-gray-100'
          }`}
        >
          {pageNum}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="rounded border border-gray-300 p-2 hover:bg-gray-100"
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
}
