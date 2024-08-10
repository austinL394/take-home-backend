import ArrowLeftIcon from 'assets/icons/arrow-left.svg?react';
import ArrowRightIcon from 'assets/icons/arrow-right.svg?react';
import DoubleArrowLeftIcon from 'assets/icons/double-arrow-left.svg?react';
import DoubleArrowRightIcon from 'assets/icons/double-arrow-right.svg?react';

interface Props {
  currentPage: number;
  pageSize: number;
  fillColor?: string;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, pageSize, fillColor = 'black', onPageChange }: Props) => {
  const handlePagePrev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };
  const handlePageNext = () => {
    if (currentPage >= pageSize) return;
    onPageChange(currentPage + 1);
  };
  const handlePageFirst = () => {
    onPageChange(1);
  };
  const handlePageLast = () => {
    onPageChange(pageSize);
  };

  return (
    <div className="flex w-full justify-center">
      <div className={`flex items-center gap-[5px] text-${fillColor}`}>
        <DoubleArrowLeftIcon
          className="cursor-pointer"
          onClick={handlePageFirst}
          fill={currentPage === 1 ? '#C0C0C0' : fillColor}
        />
        <ArrowLeftIcon
          className="cursor-pointer"
          onClick={handlePagePrev}
          fill={currentPage === 1 ? '#C0C0C0' : fillColor}
        />
        <p className="text-xs min-w-24">
          Page {currentPage} of {pageSize}
        </p>
        <ArrowRightIcon
          className="cursor-pointer"
          onClick={handlePageNext}
          fill={currentPage === pageSize ? '#C0C0C0' : fillColor}
        />
        <DoubleArrowRightIcon
          className="cursor-pointer"
          onClick={handlePageLast}
          fill={currentPage === pageSize ? '#C0C0C0' : fillColor}
        />
      </div>
    </div>
  );
};

export default Pagination;
