import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) return <div>Product not found</div>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{product.productName}</Typography>
        <Typography>Company: {product.company}</Typography>
        <Typography>Category: {product.category}</Typography>
        <Typography>Price: ${product.price}</Typography>
        <Typography>Rating: {product.rating}</Typography>
        <Typography>Discount: {product.discount}%</Typography>
        <Typography>Availability: {product.availability}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
