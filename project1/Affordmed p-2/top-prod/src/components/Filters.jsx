
import React from 'react';
import { TextField, MenuItem, Button } from '@mui/material';

const Filters = ({ filters, setFilters, handleFilter }) => {
  const categories = ['Phone', 'Computer', 'TV', 'Earphone', 'Tablet', 'Charger', 'Mouse', 'Keypad', 'Bluetooth', 'Pendrive', 'Remote', 'Speaker', 'Headset', 'Laptop', 'PC'];
  const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];

  return (
    <div>
      <TextField
        select
        label="Category"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        {categories.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Company"
        value={filters.company}
        onChange={(e) => setFilters({ ...filters, company: e.target.value })}
      >
        {companies.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Min Price"
        type="number"
        value={filters.minPrice}
        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
      />
      <TextField
        label="Max Price"
        type="number"
        value={filters.maxPrice}
        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
      />
      <Button onClick={handleFilter}>Apply Filters</Button>
    </div>
  );
};

export default Filters;