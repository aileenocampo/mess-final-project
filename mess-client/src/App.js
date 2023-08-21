import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Resources from "./components/Resources";
import Category from "./components/Category";
import Goal from "./components/Goal";
import Profile from "./components/Profile";
import Article from "./components/Article";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    paddingLeft: "2%",
    paddingRight: "4%",
  },
});

const theme = createTheme();

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box className={classes.root}>
          <Navbar />
          <Box component="main" className={classes.content}>
            <Routes>
              <Route path="/goals/:id" element={<Goal />} />

              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:categorySlug" element={<Category />} />
              <Route
                path="/resources/:categorySlug/:articleId"
                element={<Article />}
              />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
