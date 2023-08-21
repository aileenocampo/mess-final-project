import React from 'react';
import { useParams } from 'react-router-dom';
import { mockCategories, mockArticles } from './data';
import { Link } from 'react-router-dom';
import { Button, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar, Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center !important',
    paddingBottom: '3%',
  },
  font: {
    textAlign: 'center',
    width: '100%',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: "bold",
    color: "#DAA520",
    letterSpacing: "3px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.05)",
    textTransform: "uppercase",
    fontSize: "calc(14px + 2.5vw)",
    marginBottom: theme.spacing(4),
  },
  button: {
    fontSize: '1rem !important',
    marginTop: '3.5% !important',
    padding: '10px 20px !important',
    display: 'block !important',
    backgroundColor: '#CCC2F2 !important',
    color: '#6E37A6 !important',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1) !important',
    transition: 'boxShadow .3s ease, transform .3s ease !important',
    '&:hover !important': {
        backgroundColor: '#E6E0FF !important',
        boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.1) !important',
        transform: 'translateY(-2px) !important',
  },
},
articleTitle: {
  fontSize: '1rem !important',  
  fontWeight: 'bol !important',
  paddingLeft: '15px'
}
}));

function Category() {
  const classes = useStyles();
  const { categorySlug } = useParams();
    const theme = useTheme();

  
  const category = mockCategories.find(cat => cat.slug === categorySlug);
  if (!category) {
    return <div>Category not found!</div>;
  }
  
  const articles = mockArticles.filter(article => article.category_id === category.category_id);
  
  return (
    <div className={classes.container}>
      <h1 className={classes.font}>{category.name}</h1>

      <List dense sx={{ width: '80%', bgcolor: '#f7f7f7' }}>
        {articles.map((article, index) => (
          <React.Fragment key={article.article_id}>
            <ListItem disablePadding className={classes.listItem}>
              <ListItemButton component={Link} to={`/resources/${categorySlug}/${article.article_id}`}>
                <ListItemAvatar>
                  <Avatar
                    className={classes.largeAvatar}
                    alt={article.title}
                    src={`${article.imgUrl}?w=248&fit=crop&auto=format`}
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>
                {/* Using Typography for article title */}
                <Typography variant="button" className={classes.articleTitle}>
                  {article.title}
                </Typography>
              </ListItemButton>
            </ListItem>
            {index !== articles.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>

      <Button className={classes.button} component={Link} to="/resources" color="primary">
        Back to Categories
      </Button>
    </div>
  );
}

export default Category;
