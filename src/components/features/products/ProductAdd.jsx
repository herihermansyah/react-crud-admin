import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="ID"
          type="number"
          size="large"
          required
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Nama"
          size="large"
          required
        />
        <Box>
          <input type="file" style={{ display: "none" }} id="image-upload" />
          <label htmlFor="image-upload">
            <Button variant="outlined" component="span">
              Pilih Gambar
            </Button>
          </label>
        </Box>

        <FormControl>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            label="Category"
          >
            <MenuItem value="">
              <em>Pilih Kategori</em>
            </MenuItem>
            <MenuItem value="Headphone">Headphone</MenuItem>
            <MenuItem value="PC / Laptop">PC / Laptop</MenuItem>
            <MenuItem value="Camera">Camera</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="Brand-label">Brand</InputLabel>
          <Select labelId="Brand-label" id="Brand-select" label="Brand">
            <MenuItem value="">
              <em>Pilih Brand</em>
            </MenuItem>
            <MenuItem value="Apple">Apple</MenuItem>
            <MenuItem value="Samsung">Samsung</MenuItem>
            <MenuItem value="Xiaomi">Xiaomi</MenuItem>
            <MenuItem value="Sony">Sony</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          variant="outlined"
          label="Stock"
          size="large"
          type="number"
          required
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Price"
          type="number"
          size="large"
          required
        />
        <TextField
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          label="Description"
          size="large"
        />
      </Box>
      <Box sx={{ marginTop: 2, display: "flex", gap: 2 }}>
        <Button
          onClick={() => navigate("/products")}
          variant="outlined"
          size="large"
          color="secondary"
        >
          back
        </Button>
        <Button variant="contained" type="submit" size="large" color="success">
          add product
        </Button>
      </Box>
    </Container>
  );
};

export default ProductAdd;
