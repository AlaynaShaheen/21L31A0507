import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../../services/api';
import ProductDetails from '../ProductDetails';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts('AMZ', 'Laptop', 10, 1, 10000);
      const productsWithId = data.map((product, index) => ({ ...product, id: index.toString() }));
      setProducts(productsWithId);
    };

    fetchProducts();
  }, []);

  return <ProductDetails products={products} />;
};

export default ProductPage;
