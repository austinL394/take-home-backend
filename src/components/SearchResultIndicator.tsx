import classNames from 'classnames';
import { format } from 'date-fns';

interface Props {
  dataLength: number;
  from?: string | number | Date | null;
  to?: string | number | Date | null;
  onClearFilters: () => void;
  theme?: 'light' | 'dark';
  isFilterEmpty: boolean;
}

const SearchResultIndicator = ({ isFilterEmpty, dataLength, from, to, onClearFilters, theme = 'dark' }: Props) => {
  const fromString = from && format(new Date(from), 'MM/dd/yy');
  const toString = to && format(new Date(to), 'MM/dd/yy');

  return (
    <div
      className={classNames('flex gap-[22px] px-[15px] h-6 items-center', {
        'text-[#1f6c99]': theme === 'light',
        'text-[#d9d9d9]': theme === 'dark',
      })}
    >
      {!isFilterEmpty && (
        <>
          <p className="italic text-xs font-normal">
            {' '}
            Results:{' '}
            {dataLength > 0 && (
              <>
                Timestamp {toString} - {fromString}
              </>
            )}{' '}
            ({dataLength} result{dataLength > 1 && 's'})
          </p>
          <button className="outline-none underline text-xs" onClick={onClearFilters}>
            Clear Filters
          </button>
        </>
      )}
    </div>
  );
};

export default SearchResultIndicator;
