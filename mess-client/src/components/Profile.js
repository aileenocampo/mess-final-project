import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  outerWrapper: {
    display: 'flex',
    justifyContent: 'center', 
    paddingBottom: "3%"
  },
  headerAndInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
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
    fontSize:"calc(14px + 2.5vw)",
    position: 'relative', 
  },
  userInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  infoHeader: {
    fontWeight: 'bold',
    color: '#3A4D63',
    margin: '4px 0',
    fontFamily: "'Raleway', sans-serif",
  },
  infoData: {
    margin: '4px 0',
    color: '#6E7E91',
  },
  editButton: {
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
    textField: {
      marginTop: '2% !important',
      marginBottom: '1% !important',
  },
  saveButton: {
      margin: '2px !important',
      backgroundColor: '#DEDEDE !important',
      color: 'black !important',
      '&:hover !important': {
          backgroundColor: '#FF8E8E !important',
      }
  },
  cancelButton: {
      margin: '2px !important',
      backgroundColor: '#4A4A4A !important',
      color: '#fff !important',
      '&:hover !important': {
          backgroundColor: '#555 !important',
          transform: 'scale(1.05) !important'
      },
  },
}));

function Profile() {
  const classes = useStyles()

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
      <div className={classes.outerWrapper}>
        <div className={classes.headerAndInfoContainer}>
          <h2 className={classes.font}>User Profile</h2>
          <div className={classes.userInfoContainer}>
            <span className={classes.infoHeader}>Name</span> 
            <p className={classes.infoData}>{userData.userName}</p>

            <span className={classes.infoHeader}>Rank</span>
            <p className={classes.infoData}>{userData.rank}</p>

            <span className={classes.infoHeader}>Duty Station</span>
            <p className={classes.infoData}>{userData.baseName}</p>

            <span className={classes.infoHeader}>City</span>
            <p className={classes.infoData}>{userData.city}</p>

            <span className={classes.infoHeader}>State</span>
            <p className={classes.infoData}>{userData.state}</p>

            <span className={classes.infoHeader}>Country</span>
            <p className={classes.infoData}>{userData.country}</p>

            <span className={classes.infoHeader}>Counselor</span>
            <p className={classes.infoData}>{userData.counselorName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;