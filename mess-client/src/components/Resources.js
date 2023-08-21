import React from 'react';
import { Link } from 'react-router-dom';
import { mockCategories } from './data';
import { Typography, Box, ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '3%'
  },
  title: {
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
  box: {
    width: '20vw', 
    height: '20vw',  
    overflow: 'hidden', 
  },
}));

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.8,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));


const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.62,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  width: 'fit-content',
  margin: '1%',
});

function Resources() {
  const classes = useStyles();

  return (
    <Box className={classes.boxContainer}>
      <h1 className={classes.title}>Categories</h1>
      {mockCategories.map(category => (
        <StyledLink to={`/resources/${category.slug}`} key={category.category_id}>
          <ImageButton focusRipple className={classes.box}>
            <ImageSrc style={{ backgroundImage: `url(${category.img_url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {category.name}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        </StyledLink>
      ))}
    </Box>
  );
}


export default Resources;
