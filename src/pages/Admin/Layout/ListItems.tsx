import * as React from 'react';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DvrIcon from '@mui/icons-material/Dvr';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import HomeIcon from '@mui/icons-material/Home';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';

export default function ListItems() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Link to={'/admin'} style={{color: 'inherit', textDecoration: 'none'}}>
        <ListItemButton>
          <ListItemIcon >
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>
      </Link>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <DisplaySettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Paineis" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={'/admin/create'} style={{color: 'inherit', textDecoration: 'none'}}>
            <ListItemButton>
              <ListItemIcon>
                <AddToQueueIcon />
              </ListItemIcon>
              <ListItemText primary="Adicionar Paineis" />
            </ListItemButton>
          </Link>
          <Link to={'/admin/list'} style={{color: 'inherit', textDecoration: 'none'}}>
            <ListItemButton>
              <ListItemIcon>
                <DvrIcon />
              </ListItemIcon>
              <ListItemText primary="Listar Paineis" />
            </ListItemButton>
          </Link>
          <Link to={'/admin/update'} style={{color: 'inherit', textDecoration: 'none'}}>
            <ListItemButton>
              <ListItemIcon>
                <BrowserUpdatedIcon />
              </ListItemIcon>
              <ListItemText primary="Atualizar Paineis" />
            </ListItemButton>
          </Link>
          <Link to={'/admin/delete'} style={{color: 'inherit', textDecoration: 'none'}}>
            <ListItemButton>
              <ListItemIcon>
                <CancelPresentationIcon />
              </ListItemIcon>
              <ListItemText primary="Remover Paineis" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}
