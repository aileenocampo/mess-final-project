import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Grid, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { mockArticles, mockCategories } from './data';
import { LinkedList } from './LinkedList';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: "bold",
    color: "#DAA520", 
    letterSpacing: "3px", 
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.05)", 
    textTransform: "uppercase",
    fontSize:"calc(14px + 2.5vw)",
    position: 'relative', 
    marginBottom: '0px', 
    marginTop: '0px', 
  },
  image: {
    width: 'calc(5rem + 9vw)', 
    height: 'calc(5rem + 9vw)', 
    borderRadius: '50%',
    border: '1px solid #506C7F',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.08)',  
  },
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
  content: {
    textAlign: 'left',
    padding: theme.spacing(2, 0),
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: "7rem",
    marginLeft: "5px !important",
    marginRight: "5px !important",
    backgroundColor: '#BFADE6 !important', 
    color: '#F2F2F2 !important',  
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1) !important',
    transition: 'boxShadow .3s ease, transform .3s ease !important', 
    '&:hover !important': {
        backgroundColor: '#E6E0FF !important', 
        boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.1) !important',
        transform: 'translateY(-2px) !important', 
      },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    padding: "3%",
    paddingBottom: "3.5%",
    backgroundColor: '#f7f7f7',
    marginTop: "3%",
    borderRadius: '15px !important',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  imageContainer: {
    paddingTop: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: "2%"
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '3.2%',
    textAlign: 'left'
  },
  returnButton: {
    fontSize: '0.93rem !important',
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
      minWidth: '20vw',  
      maxWidth: '90%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    pinButton: {
      backgroundColor: '#4A4A4A !important',
      color: '#fff !important',
      '&:hover !important': {
          backgroundColor: '#555 !important',
          transform: 'scale(1.05) !important' 
      },
    }
}));

function Article() {
  const classes = useStyles();
  const { categorySlug, articleId } = useParams();

  const [linkedArticles, setLinkedArticles] = useState(new LinkedList());
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isPinned, setIsPinned] = useState(null);

  const currentIndex = mockArticles.findIndex(art => art.article_id.toString() === articleId);
  const [pinnedArticles, setPinnedArticles] = useState([]);

  let nextArticleId = null;
  let nextArticleCategoryId = null;

  if (currentIndex < mockArticles.length - 1) {
    nextArticleId = mockArticles[currentIndex + 1].article_id;
    nextArticleCategoryId = mockArticles[currentIndex + 1].category_id;
  }
  
  const nextCategory = mockCategories.find(cat => cat.category_id === nextArticleCategoryId);
  const nextCategorySlug = nextCategory ? nextCategory.slug : null;

  useEffect(() => {
    fetch("http://localhost:8080/pinned-articles")
      .then(response => response.json())
      .then(data => {
        setPinnedArticles(data);
      })
      .catch(error => console.error(error.message));
  }, []);

  useEffect(() => {
    const tempList = new LinkedList();
    mockArticles.forEach(article => tempList.append(article));
    setLinkedArticles(tempList);
    
    const currentArticleData = mockArticles.find(art => art.article_id.toString() === articleId);
    if (currentArticleData) {
      setCurrentArticle(currentArticleData);
      
      const isArticlePinned = !!pinnedArticles.find(article => article.article_id === currentArticleData.article_id);
      setIsPinned(isArticlePinned);
    }
  }, [articleId, pinnedArticles]);

 const togglePinStatus = () => {
    const endpoint = isPinned 
        ? `http://localhost:8080/unpin-article/${articleId}`
        : `http://localhost:8080/pin-article/${articleId}`;
  
    const method = isPinned ? 'DELETE' : 'POST';
  
    const body = isPinned ? null : JSON.stringify({
        articleId: currentArticle.article_id,
        slug: currentArticle.slug,
        title: currentArticle.title,
        content: currentArticle.content
    });
  
    fetch(endpoint, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then(response => response.json())
    .then(data => {
        setIsPinned(!isPinned);
    })
    .catch(error => console.error("Error:", error));
  }

  if (!currentArticle) return <div>Loading...</div>;

  return (
    <Container className={classes.test} maxWidth="lg">
      <Box mb={4} textAlign="center" display="flex" flexDirection="column" alignItems="center">
        <Button className={classes.returnButton} component={Link} to={`/resources/${categorySlug}`}>
          Return to {categorySlug.replace('-', ' ')}
        </Button>

        <div className={classes.container}>
          <div className={classes.imageContainer}>
            <img src={currentArticle.imgUrl} alt={currentArticle.title} className={classes.image} />
          </div>

          <div className={classes.contentContainer}>
            <h1 className={classes.title}>
              {currentArticle.title}
            </h1>

            <Typography variant="body1" className={classes.content}>
              {currentArticle.content}
            </Typography>
            <Button 
              variant="contained" 
              className={classes.pinButton}
              onClick={togglePinStatus}
              mt={2}
            >
               {isPinned === null ? "Loading..." : isPinned ? 'Unpin Article' : 'Pin Article'}
            </Button>
          </div>
        </div>

        <Box className={classes.navigation}>
        <Button
          component={Link} to={`/resources/${nextCategorySlug}/${nextArticleId}`}
          disabled={currentIndex === 0}
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon sx={{ width: 45, height: 35 }}/>}
          className={classes.backButton}
        >
        </Button>
        <Button 
          component={Link} to={`/resources/${nextCategorySlug}/${nextArticleId}`}
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon sx={{ width: 45, height: 35 }} />}
          className={classes.backButton}
          disabled={currentIndex === mockArticles.length - 1} 
        >
        </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Article;


