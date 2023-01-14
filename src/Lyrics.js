import * as React from 'react';
import "./App.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import LyricsIcon from '@mui/icons-material/Lyrics';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Brightness7 from '@mui/icons-material/Brightness7';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useParams } from "react-router-dom";

import hymns from "./songs.json";
import authors from "./authors.json";

import { Link } from "react-router-dom";

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Box } from '@mui/system';
import { FormatAlignCenter, FormatAlignJustify, TextDecrease, TextIncrease, YouTube } from '@mui/icons-material';


const light = createTheme({
  palette: {
    primary: {
      main: '#fbd53b',
      light: '#fbd53b',
      dark: '#c4a400'
    },
    success: {
      main: '#ccffcc',
    },
    warning: {
      main: '#fff0cc',
    },
    error: {
      main: '#ffcccc',
    },
    mode: 'light',
  }
})
const dark = createTheme({
  palette: {
    primary: {
      main: '#fbd53b',
      light: '#fbd53b',
      dark: '#c4a400',
    },
    success: {
      main: '#003300',
    },
    warning: {
      main: '#332400',
    },
    error: {
      main: '#330000',
    },
    text: {
      primary: 'white',
    },
    mode: 'dark',
  }
})

function Lyrics(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(light);
  const [state, setState] = React.useState({
    fontSize: 18,
    textAlign: 'left',
  })

  let params = useParams();
  let hymn = hymns[params.number - 1]

  function toggleDrawer() {
    setDrawerOpen(drawerOpen => !drawerOpen);
  }

  function toggleDarkMode() {
    theme === light ? setTheme(dark) : setTheme(light)
  }

  const handleIncreaseFontSize = () => {
    setState(previousState => ({ ...previousState, fontSize: state.fontSize + 1 }))
  }

  const handleDecreaseFontSize = () => {
    setState(previousState => ({ ...previousState, fontSize: state.fontSize - 1 }))
  }

  const handleCenterText = () => {
    setState(previousState => ({ ...previousState, textAlign: 'center' }))
  }

  const handleJustifyText = () => {
    setState(previousState => ({ ...previousState, textAlign: 'left' }))
  }

  const handleOpenYoutube = () => {
    window.open(`${hymn.hymn.youtubeURL}`, '_blank', 'noreferrer');
  }

  const actions = [
    { icon: <YouTube />, name: 'Abrir youtube', onclick: handleOpenYoutube },
    { icon: <TextIncrease />, name: 'Aumentar letra', onclick: handleIncreaseFontSize },
    { icon: <TextDecrease />, name: 'Diminuir letra', onclick: handleDecreaseFontSize },
    { icon: <FormatAlignCenter />, name: 'Centrar', onclick: handleCenterText },
    { icon: <FormatAlignJustify />, name: 'Justificar', onclick: handleJustifyText },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            Hinário Adventista
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDarkMode}
            >
              <Brightness7 />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer open={drawerOpen} onClose={toggleDrawer}>
          <Box>
            <List>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/hinario" onClick={toggleDrawer}>
                  <ListItemIcon>
                    <LyricsIcon></LyricsIcon>
                  </ListItemIcon>
                  <ListItemText>
                    Hinos
                  </ListItemText>
                </ListItemButton>
              </ListItem>
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
          <SpeedDial
            ariaLabel="Menu"
            sx={{ position: 'fixed', bottom: 20, right: 20 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction 
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.onclick}
              />
            ))}
          </SpeedDial>

          <Box sx={{ m: 4 }} />
          <Typography variant="h4" component="h4" gutterBottom align='center' style={{ textAlign: state.textAlign }}>
            {hymn.hymn.number} - {hymn.hymn.title}
          </Typography>
          <Typography variant="subtitle" component="h5" gutterBottom align='center' style={{ textAlign: state.textAlign }}>
            Letra: 
            {hymn.hymn.lyricsComposer.map((composer) => {
              return (
                <span> {authors.authors[composer-1].name}; </span>
              )
            })}
          </Typography>
          <Typography variant="subtitle" component="h5" gutterBottom align='center' style={{ textAlign: state.textAlign }}>
            Música: 
            {hymn.hymn.musicComposer.map((composer) => {
              return (
                <span> {authors.authors[composer-1].name}; </span>
              )
            })}
          </Typography>
          <Box sx={{ m: 4 }} />
          {hymn.lyrics.map((lyrics, i) => {
            return (
              <div key={i} className={`estrofe ${lyrics.chorus === true ? 'coro' : ""}`} style={{ fontSize: state.fontSize, textAlign: state.textAlign }}>
                {lyrics.strophe.map((text, tid) => {
                  return (
                    <p key={`${i}-${tid}`}>{text}</p>
                  )
                })}
              </div>

            )
          }

          )}
        </Container>

      </div>
    </ThemeProvider>
  );
}



export default Lyrics;
