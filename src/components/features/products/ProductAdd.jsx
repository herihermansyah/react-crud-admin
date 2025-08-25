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
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import LoopIcon from "@mui/icons-material/Loop";
import { toast } from "react-toastify";

// Komponen utama untuk menambah produk
const ProductAdd = () => {
  // State untuk setiap field form
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [products, setProducts] = useState([]); // Menyimpan data produk yang sudah ada

  const navigate = useNavigate();

  // Ambil data produk saat komponen mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Fungsi untuk menambah produk baru
  const addProduct = async (e) => {
    e.preventDefault();
    // Validasi ID harus 4 digit
    if (!id || id.length !== 4) {
      toast.error("id harus 4 digit");
      return;
    }
    try {
      // Cek apakah ID sudah ada
      await products.find((data) => {
        if (data.id == id) {
          return toast.error("id sudah ada");
        }
      });
      // Kirim data produk baru ke backend
      await axios.post("http://localhost:3000/products", {
        id,
        title,
        image,
        category,
        brand,
        stock,
        price,
        description,
      });
      toast.success("data berhasil di tambah");
      navigate("/products"); // Redirect ke halaman produk
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Tampilkan error jika gagal load data
  if (error)
    return (
      <div className="flex flex-col justify-center items-center mt-[15%] ">
        <ErrorIcon
          className="animate-spin"
          fontSize="large"
          color="error"
        ></ErrorIcon>
        <span className="animate-pulse">error load data.....</span>
      </div>
    );

  // Tampilkan loading saat data sedang diambil
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center mt-[15%] ">
        <LoopIcon className="animate-spin" fontSize="large">
          className="animate-spin" fontSize="large" color="error"
        </LoopIcon>
        <span className="animate-pulse">load data.....</span>
      </div>
    );

  return (
    <Container>
      {/* Form tambah produk */}
      <Box
        onSubmit={addProduct}
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Input ID, validasi hanya angka dan max 4 digit */}
        <TextField
          fullWidth
          variant="outlined"
          label="ID"
          type="text"
          size="large"
          required
          value={id}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value) && value.length <= 4) {
              setId(value);
            }
          }}
          helperText={id && id.length < 4 ? "ID harus 4 digit" : ""}
          error={id && id.length < 4}
        />
        {/* Input Nama Produk */}
        <TextField
          fullWidth
          variant="outlined"
          label="Nama"
          size="large"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Input URL Gambar */}
        <TextField
          fullWidth
          variant="outlined"
          label="Image use url"
          size="large"
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* Pilihan Kategori */}
        <FormControl>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            value={category}
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
        {/* Pilihan Brand */}
        <FormControl>
          <InputLabel id="Brand-label">Brand</InputLabel>
          <Select
            value={brand}
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

        {/* Input Stock */}
        <TextField
          fullWidth
          variant="outlined"
          label="Stock"
          size="large"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        {/* Input Harga, format ribuan */}
        <TextField
          fullWidth
          variant="outlined"
          label="Price"
          type="text"
          size="large"
          required
          value={price}
          onChange={(e) => {
            let value = e.target.value;
            const numericValue = value.replace(/\D/g, "");
            const formattedValue = numericValue.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              "."
            );
            setPrice(formattedValue);
          }}
          // Tambahkan inputMode untuk keyboard numerik di perangkat mobile
        />
        {/* Input Deskripsi */}
        <TextField
          fullWidth
          multiline
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          label="Description"
          size="large"
        />
        {/* Tombol aksi */}
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
            add product
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductAdd;
