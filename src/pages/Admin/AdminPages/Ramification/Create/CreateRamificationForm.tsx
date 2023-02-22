import { Alert, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import { FormEvent, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataContext } from "../../../../../contexts/Data/DataContext";

interface CreateRamificationProps {
  status?: boolean
  message?: string
}

export default function CreateRamificationForm() {
  const data = useContext(DataContext)

  const [categoryName, setPanelName] = useState('');
  const [categoryOrder, setCategoryOrder] = useState<any>();
  const [categoryType, setCategoryType] = useState<any>();
  const [categoryStatus, setPanelStatus] = useState('');
  const [sectorId, setSectorId] = useState<any>();
  const [categoryId, setCategoryId] = useState<any>();

  const [sectorOptions, setSectorOptions] = useState<any>([])
  const [categoryOptions, setCategoryOptions] = useState<any>([])

  useEffect(() => {
    setSectorId(null)
    setCategoryId(null)

    getStoredSectors()
    getStoredCategories()

  }, [categoryType])



  async function getStoredSectors() {
    const storedSectors = await data.getAllSectors()

    setSectorOptions(storedSectors)
  }

  async function getStoredCategories() {
    const storedCategories = await data.getAllCategory()

    setCategoryOptions(storedCategories)
  }

  const handleCreateRamification = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createRamification: CreateRamificationProps = await data.storeRamification(
      categoryName,
      categoryOrder,
      categoryType,
      categoryStatus,
      sectorId,
      categoryId
    )

    if (createRamification.status) {
      toast.success('Categoria criada com sucesso!')
    } else {
      toast.error(createRamification.message);
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
      <Box component="form" onSubmit={handleCreateRamification} sx={{ mt: 1 }}>
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
              <InputLabel>Tipo de ramificação</InputLabel>
              <Select
                label="Tipo de ramificação"
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
                <InputLabel>ID Setor</InputLabel>
                <Select
                  label="ID Setor"
                  onChange={(e) => setSectorId(e.target.value)}
                >
                  {
                    sectorOptions.map((sector: any) => {
                      return <MenuItem value={sector.sector_id}>{sector.sector_name}</MenuItem>

                    })
                  }
                </Select>
              </FormControl>
            </Grid>
          }
          {categoryType == 'subcategory' &&
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>ID Categoria</InputLabel>
                <Select
                  label="ID Categoria"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {
                    categoryOptions.map((category: any) => {
                      return <MenuItem value={category.category_id}>{category.category_name}</MenuItem>

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