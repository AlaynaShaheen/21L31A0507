import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import { Grid } from '@mui/material';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    minPrice: '',
    maxPrice: '',
  });

  const fetchProducts = async () => {
    const data = await getProducts(filters.company, filters.category, 10, filters.minPrice, filters.maxPrice);
    const productsWithId = data.map((product, index) => ({ ...product, id: index.toString() }));
    setProducts(productsWithId);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilter = () => {
    fetchProducts();
  };

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} handleFilter={handleFilter} />
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllProducts;