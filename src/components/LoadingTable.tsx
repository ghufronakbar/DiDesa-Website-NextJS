import React from 'react';

interface LoadingTableProps {
    colSpan: number;
    count: number;
}

const TableLoading: React.FC<LoadingTableProps> = ({ colSpan, count }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <tr key={index} className="border-t">
                    <td colSpan={colSpan} className="w-full px-4">
                        <div className="w-full flex flex-col gap-1 py-4">
                            <div className="w-1/3 h-2 bg-gray-200 animate-pulse rounded-3xl"></div>
                            <div className="w-full h-2 bg-gray-200 animate-pulse rounded-3xl"></div>
                            <div className="w-2/3 h-2 bg-gray-200 animate-pulse rounded-3xl"></div>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default TableLoading;
