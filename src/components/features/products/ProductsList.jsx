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

export default function DataTable() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProducts = async (id) => {
    const isConfrim = confirm("are you sure ?");
    if (isConfrim) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        getProducts();
        toast.success("data berhasil di hapus");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("data gagal di hapus");
    }
  };

  const handleDelete = (id) => {
    deleteProducts(id);
  };

  const handleRead = (id) => {
    navigate(`/productsView/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/productsEdit/${id}`);
  };

  const handleAdd = () => {
    navigate("/productsAdd");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Nama", width: 300 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
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

  const paginationModel = { page: 0, pageSize: 10 };

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
        />
      </Paper>
    </Box>
  );
}
