import { FilterSidebar } from '../FilterSidebar';
import { useState } from 'react';

export default function FilterSidebarExample() {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 30],
    dietary: [],
    minRating: 0,
  });

  return (
    <div className="max-w-xs">
      <FilterSidebar
        filters={filters}
        onFilterChange={setFilters}
        onClear={() => setFilters({ categories: [], priceRange: [0, 30], dietary: [], minRating: 0 })}
      />
    </div>
  );
}
