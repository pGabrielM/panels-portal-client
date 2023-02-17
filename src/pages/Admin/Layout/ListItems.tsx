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
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export default function ListItems() {
  const [openPanelMenu, setOpenPanelMenu] = React.useState(false);
  const [openCategoryMenu, setOpenCategoryMenu] = React.useState(false);

  const handleClickPanel = () => {
    setOpenPanelMenu(!openPanelMenu);
  };
  const handleClickCategory = () => {
    setOpenCategoryMenu(!openCategoryMenu);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Link to={'/admin'} style={{color: 'black', textDecoration: 'none'}}>
        <ListItemButton >
          <ListItemIcon >
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>
      </Link>
      <ListItemButton onClick={handleClickPanel}>
        <ListItemIcon>
          <DisplaySettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Paineis" style={{color: 'black'}}/>
        {openPanelMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openPanelMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={'/admin/panel/create'} style={{color: 'inherit', textDecoration: 'none'}}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AddToQueueIcon />
              </ListItemIcon>
              <ListItemText primary="Adicionar Paineis" />
            </ListItemButton>
          </Link>
          <Link to={'/admin/panel/list'} style={{color: 'inherit', textDecoration: 'none'}}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <DvrIcon />
              </ListItemIcon>
              <ListItemText primary="Listar Paineis" />
            </ListItemButton>
          </Link>
          <Link to={'/admin/panel/update'} style={{color: 'inherit', textDecoration: 'none'}}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <BrowserUpdatedIcon />
              </ListItemIcon>
              <ListItemText primary="Atualizar Paineis" />
            </ListItemButton>
          </Link>
          <Link to={'/admin/panel/delete'} style={{color: 'inherit', textDecoration: 'none'}}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <CancelPresentationIcon />
              </ListItemIcon>
              <ListItemText primary="Remover Paineis" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickCategory}>
        <ListItemIcon>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary="Categorias" style={{color: 'black'}}/>
        {openCategoryMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCategoryMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={'/admin/category/create'} style={{color: 'inherit', textDecoration: 'none'}}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AddToQueueIcon />
              </ListItemIcon>
              <ListItemText primary="Adicionar Setor" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}
