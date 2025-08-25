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
import ErrorIcon from "@mui/icons-material/Error";
import LoopIcon from "@mui/icons-material/Loop";
import { toast } from "react-toastify";

// Komponen utama untuk edit produk
const ProductEdit = () => {
  // State untuk error, loading, dan data produk
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
  const navigate = useNavigate();

  // Ambil parameter ID dari URL
  const { edit_ID } = useParams();

  // Ambil data produk saat komponen mount
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Request data produk dari backend
        const response = await axios.get(
          `http://localhost:3000/products/${edit_ID}`
        );
        const product = response.data;
        // Set data produk ke state
        setId(product.id);
        setTitle(product.title);
        setImage(product.image);
        setCategory(product.category);
        setBrand(product.brand);
        setStock(product.stock);
        // Format harga ke format lokal
        setPrice(product.price ? product.price.toLocaleString("id-ID") : "");
        setDescription(product.description);
      } catch (error) {
        // Tampilkan error jika gagal
        toast.error(`Gagal memuat data produk.${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [edit_ID]);

  // Fungsi untuk handle submit edit produk
  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      // Bersihkan format harga sebelum dikirim ke backend
      const cleanPrice = Number(price.replace(/\./g, ""));
      await axios.put(`http://localhost:3000/products/${id}`, {
        id,
        title,
        image,
        category,
        brand,
        stock,
        price: cleanPrice,
        description,
      });
      toast.success("data berhasil di edit");
      // Redirect ke halaman produk setelah edit
      navigate("/products");
    } catch (error) {
      setError(error);
      toast.error(`Gagal mengedit produk.${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Tampilkan error jika ada
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

  // Tampilkan loading spinner saat data dimuat
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center mt-[15%] ">
        <LoopIcon className="animate-spin" fontSize="large">
          className="animate-spin" fontSize="large" color="error"
        </LoopIcon>
        <span className="animate-pulse">load data.....</span>
      </div>
    );

  // Form edit produk
  return (
    <Container>
      <Box
        onSubmit={handleEditProduct} // Fungsi submit edit
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Input ID produk, hanya bisa 4 digit dan disabled */}
        <TextField
          fullWidth
          variant="outlined"
          label="ID"
          type="text"
          size="large"
          required
          value={id || ""}
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
        {/* Input nama produk */}
        <TextField
          fullWidth
          variant="outlined"
          label="Nama"
          size="large"
          required
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Input URL gambar produk */}
        <TextField
          fullWidth
          variant="outlined"
          label="Image use url"
          size="large"
          required
          value={image || ""}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* Pilihan kategori produk */}
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
        {/* Pilihan brand produk */}
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

        {/* Input stok produk */}
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
        {/* Input harga produk, otomatis format ribuan */}
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
        {/* Input deskripsi produk */}
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
            edit product
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductEdit;
