import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PreviewIcon from "@mui/icons-material/Preview";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import LoopIcon from "@mui/icons-material/Loop";

// Komponen utama untuk menampilkan daftar produk
export default function DataTable() {
  // State untuk data produk, error, dan loading
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fungsi untuk mengambil data produk dari API
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data); // Set data produk
    } catch (error) {
      setError(error); // Set error jika gagal
    } finally {
      setLoading(false); // Set loading selesai
    }
  };

  // Ambil data produk saat komponen pertama kali di-render
  useEffect(() => {
    getProducts();
  }, []);

  // Fungsi untuk menghapus produk berdasarkan id
  const deleteProducts = async (id) => {
    const isConfrim = confirm("are you sure ?"); // Konfirmasi sebelum hapus
    if (isConfrim) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        getProducts(); // Refresh data setelah hapus
        toast.success("data berhasil di hapus");
      } catch (error) {
        setError(error);
      }
    } else {
      toast.error("data gagal di hapus");
    }
  };

  // Handler untuk tombol hapus
  const handleDelete = (id) => {
    deleteProducts(id);
  };

  // Handler untuk tombol view
  const handleRead = (id) => {
    navigate(`/productsView/${id}`);
  };

  // Handler untuk tombol edit
  const handleEdit = (id) => {
    navigate(`/productsEdit/${id}`);
  };

  // Handler untuk tombol tambah produk
  const handleAdd = () => {
    navigate("/productsAdd");
  };

  // Definisi kolom untuk DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Nama", width: 300 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        // Render gambar produk
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100%",
            }}
          >
            <img
              src={params.value}
              alt={params.title}
              loading="lazy"
              width={50}
              height={50}
            />
          </Box>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 150,
    },
    {
      headerName: "Action",
      width: 350,
      renderCell: (params) => {
        // Tombol aksi: view, edit, delete
        return (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100%",
            }}
          >
            <Button
              onClick={() => handleRead(params.row.id)}
              variant="contained"
              startIcon={<PreviewIcon />}
            >
              view
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEdit(params.row.id)}
              startIcon={<EditIcon />}
            >
              edit
            </Button>
            <Button
              onClick={() => handleDelete(params.row.id)}
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
            >
              delete
            </Button>
          </Box>
        );
      },
    },
  ];

  // Model pagination awal
  const paginationModel = { page: 0, pageSize: 10 };

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

  // Render utama: tombol tambah dan tabel produk
  return (
    <Box>
      <Box sx={{ marginBottom: 2 }}>
        <Button
          onClick={handleAdd}
          variant="contained"
          color="success"
          size="large"
          startIcon={<AddIcon />}
        >
          add product
        </Button>
      </Box>
      <Paper sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          showToolbar
          disableColumnResize={true}
          sx={{ border: 0 }}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}