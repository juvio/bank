import { type ChangeEvent, type MouseEvent, useState } from 'react';

interface UseTransactionFilterParams {
  filterType: string;
  filterPeriod: string;
  searchTerm: string;
  onFilterTypeChange: (type: string) => void;
  onFilterPeriodChange: (period: string) => void;
  onSearchTermChange: (term: string) => void;
  onClearFilters: () => void;
}

function calculateActiveFiltersCount(
  filterType: string,
  filterPeriod: string
): number {
  return (filterType !== 'all' ? 1 : 0) + (filterPeriod !== 'all' ? 1 : 0);
}

function hasActiveFilters(
  filterType: string,
  filterPeriod: string,
  searchTerm: string
): boolean {
  return filterType !== 'all' || filterPeriod !== 'all' || searchTerm !== '';
}

export function useTransactionFilter({
  filterType,
  filterPeriod,
  searchTerm,
  onFilterTypeChange,
  onFilterPeriodChange,
  onSearchTermChange,
  onClearFilters,
}: UseTransactionFilterParams) {
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFiltersCount = calculateActiveFiltersCount(
    filterType,
    filterPeriod
  );
  const showClearButton = hasActiveFilters(
    filterType,
    filterPeriod,
    searchTerm
  );

  const handleToggleExpand = () => setIsExpanded((current) => !current);
  const handleSearchTermChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => onSearchTermChange(event.target.value);
  const handleClearSearchTerm = () => onSearchTermChange('');
  const handleFilterTypeChange = (event: MouseEvent<HTMLElement>) => {
    const { value } = event.currentTarget.dataset;

    if (value) {
      onFilterTypeChange(value);
    }
  };
  const handleFilterPeriodChange = (event: MouseEvent<HTMLElement>) => {
    const { value } = event.currentTarget.dataset;

    if (value) {
      onFilterPeriodChange(value);
    }
  };

  return {
    activeFiltersCount,
    handleClearFilters: onClearFilters,
    handleClearSearchTerm,
    handleFilterPeriodChange,
    handleFilterTypeChange,
    handleSearchTermChange,
    handleToggleExpand,
    isExpanded,
    showClearButton,
  };
}
