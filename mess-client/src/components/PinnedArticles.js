import React, { useState, useEffect } from "react";
import { mockArticles, mockCategories } from './data';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: "'Raleway', sans-serif",
        fontWeight: "bold",
        color: "#DAA520",  
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.05)", 
        textTransform: "uppercase",
        fontSize: "calc(14px + 2.4vw)",
        marginBottom: "2%",
        marginTop: "5%",
    },
    accordion: {
        width: '95%',
        boxSizing: 'border-box',
    },
    parent: {
        marginBottom: "7%",
    },
    articleTitle: {
        fontSize: '1.3em !important',
        fontWeight: 'bold !important',
    },
    button: {
        marginTop: '5%',   
        marginBottom: '5%',   
        backgroundColor: '#4A4A4A !important',
        color: '#fff !important',
        '&:hover !important': {
            backgroundColor: '#555 !important',
            transform: 'scale(1.05) !important'  
        },
    }
}));

function PinnedArticles() {
    const classes = useStyles();
    const [pinned, setPinnedArticles] = useState([]); 

    const getCategorySlug = (article) => {
        const category = mockCategories.find(cat => cat.category_id === article.category_id);
        return category ? category.slug : 'unknown-category';
    }

    useEffect(() => {
        fetch("http://localhost:8080/pinned-articles")
            .then(response => response.json())  
            .then(data => {
                setPinnedArticles(data);
            })
            .catch(error => console.error(error.message));
    }, []);

    return (
        <div className={classes.parent}>
            <h2 className={classes.title}>Pinned Articles</h2>
            {pinned.map(article => (
                <Accordion key={article.article_id} className={classes.accordion}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`article-${article.article_id}-content`}
                        id={`article-${article.article_id}-header`}
                    >
                        <Typography className={classes.articleTitle}>{article.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>   
                            {article.content?.substring(0, 100) + '...'}
                        </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                        <Link to={`/resources/${article.slug}/${article.article_id}`}>
                            <Button className={classes.button} variant="contained" color="primary">Read More</Button>
                        </Link>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default PinnedArticles;
