import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../../hooks/useApi";

interface PanelDataProps {
  id: number
  panel_name: String
  panel_link: String
  created_by_user: String
}

export default function DeletePanelForm() {
  const data = useApi()
  const [allPanels, setAllPanels] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getPanels = async () => {
      const panels = await data.getAllPanel()
      setAllPanels(panels)
    }
    getPanels()
  }, [])

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
        Qual indicador você deseja remover?
      </Typography>
      <Box height={500}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {allPanels.map((panel: PanelDataProps, key) => {
              return (
                <tr key={panel.id}>
                  <td>{panel.id}</td>
                  <td>{panel.panel_name}</td>
                  <td>{panel.panel_link}</td>
                  <td>{panel.created_by_user}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Box>
    </Paper>
  )
}