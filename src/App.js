import * as React from 'react';
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Container from "@mui/material/Container";

import oldToNew from "./data/1996_to_2022.json";
import newToOld from "./data/2022_to_1996.json";

import { Link } from "react-router-dom";

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Box } from '@mui/system';

var source = null;

function App(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  function toggleDrawer() {
    setDrawerOpen(drawerOpen => !drawerOpen);
  }

  if (props.which === 'old') {
    source = oldToNew
  } else {
    source = newToOld
  }

  const rows = source.map((hymn) => {
    let color = 'transparent';
    if (hymn.notes === 'Removido') {
      color = "#ffcccc";
    }
    if (hymn.notes === 'Novo') {
      color = "#ccffcc";
    }
    if (hymn.notes === 'Alterado') {
      color = "#fff0cc";
    }

    return (
      <TableRow
        key={hymn.original_number}
        sx={{ bgcolor: color }}
      >
        <TableCell>{hymn.original_number}</TableCell>
        <TableCell>{hymn.title}</TableCell>
        <TableCell>{hymn.new_number}</TableCell>
        <TableCell>{hymn.new_title}</TableCell>
      </TableRow>
    );
  });

  return (
    <div className='app'>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Novo Hinário Adventista
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/hinario/antigo" onClick={toggleDrawer}>
              <ListItemIcon>
                <EventBusyIcon></EventBusyIcon>
              </ListItemIcon>
              <ListItemText>
              Hinos retirados
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/hinario/novo" onClick={toggleDrawer}>
              <ListItemIcon>
                <EventAvailableIcon></EventAvailableIcon>
              </ListItemIcon>
              Hinos introduzidos
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      </Drawer>
      <Container>
      <Box sx={{ m: 4 }} />
      <Typography variant="h4" component="span" gutterBottom align='center'>
      {props.which === 'old' ? "Hinos retirados" : "Hinos introduzidos"}
      </Typography>
      <Typography variant="body1" gutterBottom style={{marginTop: 15}}>
        A informação aqui disponibilizada vem do site musicaeadoracao.com.br, tendo sido originalmente criada por <strong>Lucas Pereira de Freitas</strong>.
      </Typography>
      <div className='colors'>
        <div className='colorExplanation'>
          <div className='removed'></div>
          <span>Removido</span>
        </div>
        <div className='colorExplanation'>
          <div className='new'></div>
          <span>Novo</span>
        </div>
        <div className='colorExplanation'>
          <div className='changed'></div>
          <span>Alterado</span>
        </div>
      </div>
      <Box sx={{ m: 4 }} />
        <TableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Hino</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Novo número</TableCell>
              <TableCell>Título</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
            </TableContainer>
      </Container>
    </div>
    
  );
}



export default App;
