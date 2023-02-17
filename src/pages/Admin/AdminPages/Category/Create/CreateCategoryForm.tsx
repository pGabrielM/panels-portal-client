import { Alert, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import { FormEvent, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataContext } from "../../../../../contexts/Auth/Data/DataContext";

interface CreateCategoryProps {
  status?: boolean
  message?: string
}

export default function CreateCategoryForm() {
  const data = useContext(DataContext)

  const [categoryName, setPanelName] = useState('');
  const [categoryOrder, setCategoryOrder] = useState<any>();
  const [categoryType, setCategoryType] = useState<any>();
  const [categoryStatus, setPanelStatus] = useState('');
  const [categoryId, setCategoryId] = useState<any>();
  const [subCategoryId, setSubCategoryId] = useState<any>();

  useEffect(() => {
      setCategoryId(null)
      setSubCategoryId(null)
  }, [categoryType])

  const handleCreatePanel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createPanel: CreateCategoryProps = await data.storeCategory(
      categoryName,
      categoryOrder,
      categoryType,
      categoryStatus,
    )

    if (createPanel.status) {
      toast.success('Categoria criada com sucesso!')
    } else {
      toast.error(createPanel.message);
    }
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 540,
        width: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Preencha o formulário para adicionar uma nova ramificação.
      </Typography>
      <Box component="form" onSubmit={handleCreatePanel} sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Nome da ramificação"
              fullWidth
              variant="standard"
              onChange={(e) => setPanelName(e.target.value)}
              value={categoryName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Ordem de exibição</InputLabel>
              <Select
                label="Ordem de exibição"
                onChange={(e) => setCategoryOrder(e.target.value)}
              >
                {
                  Array.from({ length: 11 }, (e, key) => {
                    if (key != 0) {
                      return <MenuItem value={key}>{key}</MenuItem>
                    }
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Codigo da subcategoria</InputLabel>
              <Select
                label="Qual tipo de ramificação?"
                onChange={(e) => setCategoryType(e.target.value)}
              >
                <MenuItem value={'sector'}>Setor</MenuItem>
                <MenuItem value={'category'}>Categoria</MenuItem>
                <MenuItem value={'subcategory'}>Subcategoria</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {categoryType == 'category' && 
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>ID categoria</InputLabel>
              <Select
                label="ID categoria"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {
                  Array.from({ length: 11 }, (e, key) => {
                    if (key != 0) {
                      return <MenuItem value={key}>{key}</MenuItem>
                    }
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          }
          {categoryType == 'subcategory' && 
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>ID Subcategoria</InputLabel>
              <Select
                label="ID Subcategoria"
                onChange={(e) => setSubCategoryId(e.target.value)}
              >
                {
                  Array.from({ length: 11 }, (e, key) => {
                    if (key != 0) {
                      return <MenuItem value={key}>{key}</MenuItem>
                    }
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          }
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                defaultValue={''}
                label="Status"
                onChange={(e) => setPanelStatus(e.target.value)}
              >
                <MenuItem value={'active'}>Ativo</MenuItem>
                <MenuItem value={'disabled'}>Inativo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} margin={'auto'}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Salvar</Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}