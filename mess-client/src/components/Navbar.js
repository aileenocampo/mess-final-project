import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';

const drawerWidth = '150px';

const useStyles = makeStyles((theme) => ({
  navbar: {
    width: drawerWidth,
    flexShrink: 0,
    padding: "0%"
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#2C3E50 !important",
  },
  listItemText: { 
    color: "#FFFFFF",
  },
  toolbar: theme.mixins.toolbar,
}));

function Navbar() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.navbar}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.toolbar} /> 
      <List>
        {[{ text: 'Home', link: '/' }, { text: 'Resources', link: '/resources' }, { text: 'Profile', link: '/profile' }].map((item) => (
          <ListItem key={item.text} button component={Link} to={item.link}>
            <ListItemButton>
              <ListItemText primary={item.text} className={classes.listItemText} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Navbar;
