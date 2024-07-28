import React from 'react';
import { useRouter } from 'next/router';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { PaginationProps } from '@/models/Pagination';

const ButtonPagination: React.FC<{ pagination: PaginationProps }> = ({ pagination }) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push({ pathname: router.pathname, query: { ...router.query, page } });
  };

  return pagination ? (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        disabled={pagination.currentPage === 1}
      >
        <MdNavigateBefore />
      </button>
      {Array.from({ length: pagination.totalPage }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 mx-1 rounded-md hover:bg-gray-400 ${
            pagination.currentPage === index + 1
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-black'
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        disabled={pagination.currentPage === pagination.totalPage}
      >
        <MdNavigateNext />
      </button>
    </div>
  ) : null;
};

export default ButtonPagination;
