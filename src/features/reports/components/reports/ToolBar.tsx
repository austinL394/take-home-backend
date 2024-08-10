import { format } from 'date-fns';
import DatePicker from 'components/Form/DatePicker';
import SearchInput from 'components/Form/SearchInput';
import SelectMenu from 'components/Form/Select';
import { AIResultType, PriorityType, SearchFilters } from 'features/reports/types';
import { Report } from 'features/reports/types';
import classNames from 'classnames';
import { AiResultIcon } from '../table-view/AiResultIcon';
import { useLocations } from 'features/reports/api';

interface ToolBarProps {
  filters: SearchFilters;
  reports: Report[];
  onChangeFilters: (arg: SearchFilters) => void;
}

export const ToolBar = ({ filters, reports, onChangeFilters }: ToolBarProps) => {
  // Sort reports by AcquisitionDate
  const sortedReports = reports.sort(
    (a, b) => a.ecgs[0].acquisitionDate.getTime() - b.ecgs[0].acquisitionDate.getTime(),
  );

  // The oldest report is the first element
  const oldestReport = sortedReports?.[0];

  // The latest report is the last element
  const latestReport = sortedReports?.[sortedReports.length - 1];

  const oldestReportDateFormatted = oldestReport && format(new Date(oldestReport.ecgs[0].acquisitionDate), 'MM/dd/yy');
  const latestReportDateFormatted = latestReport && format(new Date(latestReport.ecgs[0].acquisitionDate), 'MM/dd/yy');

  const isFilterEmpty = !Object.values(filters).some((value) => value);
  const { data: locationFetchResponse } = useLocations();

  return (
    <div className="w-full flex bg-black text-white pl-[45px] pr-9 pt-3.5 pb-[19px] items-center justify-between flex-col md:flex-row">
      <div className="flex w-full flex-col gap-[14px]">
        <div className="flex flex-wrap items-baseline gap-[18px]">
          <div className="flex flex-col gap-1 w-full md:w-[302px]">
            <div className=" text-sm text-medium text-left">Search</div>
            <SearchInput
              placeholder="Search anything..."
              value={filters.query}
              onChange={(value) => onChangeFilters({ ...filters, query: value })}
            />
          </div>
          <div className="flex flex-col gap-1 items-center  acquisition-date-filter">
            <div className="w-full text-sm text-medium text-left">Acquisition Date</div>
            <div className="flex gap-[10px]">
              <DatePicker
                customStyles="max-w-[90px] text-[9px]"
                value={filters.acquisitionFrom}
                onChange={(value) => onChangeFilters({ ...filters, acquisitionFrom: value })}
              />
              <p>to</p>
              <DatePicker
                customStyles="max-w-[90px] text-[9px]"
                value={filters.acquisitionTo}
                onChange={(value) => onChangeFilters({ ...filters, acquisitionTo: value })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 scan-location-filter">
            <div className="w-full text-sm text-medium text-left">Scan Location</div>
            <div className="w-[216px]">
              <SelectMenu
                title="Select locations(s)"
                name="location"
                allowEmpty
                value={filters.scanLocation}
                list={['All', ...(locationFetchResponse?.result || []).sort()].map((location) => ({
                  label: location,
                  value: location === 'All' ? '' : location,
                }))}
                onChange={(v, _) => onChangeFilters({ ...filters, scanLocation: v })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 ai-result-filter">
            <div className="w-full text-sm text-medium text-left">AI Results</div>
            <div className="w-[132px]">
              <SelectMenu
                title="Select"
                name="aiResult"
                allowEmpty
                value={filters.selectedAIResult}
                list={[
                  {
                    label: 'All',
                    value: '',
                  },
                  ...[AIResultType.GOOD, AIResultType.WARNING, AIResultType.DANGER, AIResultType.AI_WARNING].map(
                    (value) => ({
                      label: <AiResultIcon resultType={value} />,
                      value,
                    }),
                  ),
                ]}
                onChange={(v, _) => onChangeFilters({ ...filters, selectedAIResult: v as AIResultType })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 xl:flex hidden">
            <div className="w-full text-sm text-medium text-left">Priority</div>
            <div className="w-[132px]">
              <SelectMenu
                title="Select"
                name="priority"
                allowEmpty
                value={filters.selectedPriorityType}
                list={[
                  {
                    label: 'All',
                    value: '',
                  },
                  ...Object.entries(PriorityType).map(([key, value]) => ({
                    label: key,
                    value,
                  })),
                ]}
                onChange={(v, _) => onChangeFilters({ ...filters, selectedPriorityType: v as PriorityType })}
              />
            </div>
          </div>
        </div>
        <div
          className={classNames('flex justify-start items-start gap-[5px]', {
            'pt-4': isFilterEmpty,
          })}
        >
          {!isFilterEmpty && (
            <>
              <p className="italic text-xs font-normal text-[#d9d9d9]">
                {' '}
                Results:{' '}
                {reports.length > 0 && (
                  <>
                    Timestamp {oldestReportDateFormatted} - {latestReportDateFormatted}
                  </>
                )}{' '}
                ({reports.length} result{reports.length > 1 && 's'})
              </p>
              <button
                className="outline-none underline text-teal text-xs"
                onClick={() =>
                  onChangeFilters({
                    query: '',
                    acquisitionFrom: null,
                    acquisitionTo: null,
                  })
                }
              >
                Clear Filters
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
