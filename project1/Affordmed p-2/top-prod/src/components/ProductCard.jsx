import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          <Link to={`/product/${product.id}`}>{product.productName}</Link>
        </Typography>
        <Typography>Price: ${product.price}</Typography>
        <Typography>Rating: {product.rating}</Typography>
        <Typography>Discount: {product.discount}%</Typography>
        <Typography>Availability: {product.availability}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
