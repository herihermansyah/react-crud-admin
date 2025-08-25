import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";

export default function ProductsView() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `http://localhost:3000/products/${id}`
          );
          setProduct(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const handleBack = () => {
    navigate("/products");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ height: "auto", width: "auto" }}>
      <CardActionArea disableTouchRipple sx={{ display: "flex", gap: 20 }}>
        <CardContent>
          <CardMedia
            sx={{ borderRadius: 5, minHeight: 500, maxHeight: 800 }}
            component="img"
            image={product.image}
            alt={product.title}
          />
        </CardContent>

        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            {product.title}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
            Category : {product.category}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
            Brand : {product.brand}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
            Stock : {product.stock}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
            Price : $ {product.price}
          </Typography>
          <Typography variant="p" component="div">
            Description : {product.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, marginTop: 5 }}>
            <Button
              onClick={handleBack}
              variant="contained"
              color="success"
              size="large"
            >
              back
            </Button>
            <Button
              onClick={() => navigate(`/productsEdit/${id}`)}
              variant="contained"
              color="secondary"
              size="large"
            >
              edit
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
