import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Goals from './Goals'; 
import Button from '@mui/material/Button'; 
import PinnedArticles from './PinnedArticles'; 

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  font: {
    fontFamily: "'Kaushan Script', 'cursive'",
    fontSize:"calc(12px + 5vw)",
    color: "#DEDEDE",
    paddingLeft: "10%",
    paddingRight: "10%",
    textWrap: "wrap",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    lineHeight: "1.2",
    marginBottom: "4%",
    letterSpacing: "2.5px",
  },
  goalsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },  
  banner: {
    background: "#3A4D63",
    width: '120%',
    top: 0,
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
},
articles: {
  paddingLeft: '30px',
}
}));

function Home() {
  const classes = useStyles();

  const [userData, setUser] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:8080/users/1`)
        .then(response => response.json())
        .then(data => {
            setUser(data);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error.message);
        });
  }, []);

  return (
    <div>
      <div className={classes.page}>
        <div className={classes.banner}>
          <h1 className={classes.font}>Welcome, {userData.userName}</h1>
        </div>
        <div className={classes.goalsContainer}>
          <Goals />
        </div>
      </div>
        <div className={classes.articles}>
          <PinnedArticles />      
      </div>
</div>
  )
}

export default Home;