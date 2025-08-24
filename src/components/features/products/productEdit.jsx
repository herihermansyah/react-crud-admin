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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductEdit = () => {
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const navigate = useNavigate();

  const { productID } = useParams();

  // --- Perbaikan Logika: Mengambil data produk saat komponen dimuat ---
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${productID}`
        );
        const product = response.data;

        // Mengisi state dengan data dari API
        setId(product.id);
        setTitle(product.title);
        setImage(product.image);
        setCategory(product.category);
        setBrand(product.brand);
        setStock(product.stock);
        setPrice(product.price ? product.price.toLocaleString("id-ID") : "");
        setDescription(product.description);
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error("Gagal memuat data produk.");
      }
    };
    fetchProductData();
  }, [productID]);
  // --- Akhir Perbaikan Logika ---

  const handleEditProduct = async (e) => {
    // Mengganti nama fungsi agar lebih jelas
    e.preventDefault();
    try {
      const cleanPrice = Number(price.replace(/\./g, ""));
      const response = await axios.put(`http://localhost:3000/products/${id}`, {
        id,
        title,
        image,
        category,
        brand,
        stock,
        price: cleanPrice,
        description,
      });
      console.log(response);
      toast.success("data berhasil di edit");
      navigate("/products");
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengedit produk.");
    }
  };

  return (
    <Container>
      <Box
        onSubmit={handleEditProduct} // Menggunakan fungsi edit yang benar
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="ID"
          type="text"
          size="large"
          required
          value={id || ""} // Menggunakan fallback value
          disabled
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value) && value.length <= 4) {
              setId(value);
            }
          }}
          helperText={id && id.length < 4 ? "ID harus 4 digit" : ""}
          error={id && id.length < 4}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Nama"
          size="large"
          required
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Image use url"
          size="large"
          required
          value={image || ""}
          onChange={(e) => setImage(e.target.value)}
        />

        <FormControl>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
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
          <Select
            value={brand || ""}
            onChange={(e) => setBrand(e.target.value)}
            labelId="Brand-label"
            id="Brand-select"
            label="Brand"
          >
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
          value={stock || ""}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Price"
          type="text"
          size="large"
          required
          value={price || ""}
          onChange={(e) => {
            let value = e.target.value;
            const numericValue = value.replace(/\D/g, "");
            const formattedValue = numericValue.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              "."
            );
            setPrice(formattedValue);
          }}
        />
        <TextField
          fullWidth
          multiline
          rows={2}
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          label="Description"
          size="large"
        />
        <Box sx={{ marginTop: 2, display: "flex", gap: 2 }}>
          <Button
            onClick={() => navigate("/products")}
            variant="outlined"
            size="large"
            color="secondary"
          >
            back
          </Button>
          <Button
            variant="contained"
            type="submit"
            size="large"
            color="success"
          >
            edit product
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductEdit;
