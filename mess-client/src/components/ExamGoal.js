import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Fab,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  font: {
    textAlign: "center",
    width: "100%", 
    fontFamily: "'Raleway', sans-serif",
    fontWeight: "bold",
    color: "#DAA520",
    letterSpacing: "3px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.05)",
    textTransform: "uppercase",
    fontSize: "calc(14px + 2.5vw)",
    position: "relative",
    marginBottom: "2px",
    marginTop: "0px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "4%",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#FAFAFA",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
  },
  subHeading: {
    fontSize: "20px",
    color: "#333",
    fontWeight: "500",
    margin: "15px 0",
    marginBottom: "0px",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "4px",
    marginTop: "2.2%",
  },
  list: {
    margin: "10px 0",
    paddingLeft: "25px",
    marginTop: "1px",
    marginBottom: "0px",
  },
  expandedContainer: {
    paddingBottom: "3%",
  },
  textField: {
    marginTop: "3.3% !important",
    marginBottom: "1% !important", 
  },
  buttonContainer: {
    display: "flex !important",
    justifyContent: "center !important",
    paddingTop: "0.5%",
    gap: "10px",
  },
  fabContainer: {
    marginTop: "3.3% !important",
    display: "flex !important",
    justifyContent: "right !important",
    paddingTop: "0.5%",
    gap: "2%",
  },
  saveButton: {
    width: "20% !important",
    marginTop: "3.3% !important",
    padding: "10px 20px !important",
    display: "block !important",
    backgroundColor: "#DEDEDE !important", 
    color: "black !important",
    "&:hover !important": {
      backgroundColor: "#FF8E8E !important", 
    },
  },
  cancelButton: {
    width: "20% !important",
    marginTop: "3.3% !important",
    padding: "10px 20px !important",
    display: "block !important",
    backgroundColor: "#4A4A4A !important",
    color: "#fff !important",
    "&:hover !important": {
      backgroundColor: "#555 !important",
      transform: "scale(1.05) !important",
    },
  },
}));

function ExamGoal({
  goal,
  isEditing,
  handleSave,
  setIsEditing,
}) {
  const classes = useStyles();
  const [status, setStatus] = useState("");
  const [testingCenters, setTestingCenters] = useState([]);
  const [testingCenter, setTestingCenter] = useState([]);
  const [testDate, setTestDate] = useState("");


  return (
    <div
      className={`${classes.container} ${
        isEditing ? classes.expandedContainer : ""
      }`}
    >
      <h2 className={classes.font}>
        {goal.type}: {goal.title}
      </h2>

      {isEditing ? (
        <FormControl fullWidth margin="normal">
          <InputLabel id="modify-status-select-label">Status</InputLabel>

          <Select
            labelId="modify-status-select-label"
            value={status}
            oonChange={(e) => setStatus(e.target.value)}
            className={classes.textField}
          >
            <MenuItem value="Passed">Passed</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <p className={classes.text}>
          <strong>Status:</strong> {goal.status}
        </p>
      )}

      {isEditing ? (
        <TextField
          className={classes.textField}
          margin="normal"
          label="Test Date"
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true, required: true }}
          value={testDate}
          onChange={(e) => setTestDate(e.target.value)}
        />
      ) : (
        <p className={classes.text}>
          <strong>Test Date:</strong> {moment(goal.test_date).format("LL")}
        </p>
      )}

      {isEditing ? (
        <TextField
          className={classes.textField}
          label="Testing Center"
          variant="outlined"
          select
          value={testingCenter?.name}
          onChange={(e) => setTestingCenter(e.target.value)}
        >
          {testingCenters.map((center) => (
            <MenuItem key={center.center_id} value={center.center_id}>
              {center.name}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <p className={classes.text}>
          <strong>Testing Center:</strong> {goal.center_name}
        </p>
      )}
      {goal.study_resources.length > 0 && (
        <>
          <h3 className={classes.text}>Study Resources</h3>
          <ul className={classes.list}>
            {goal.study_resources.map((resource, index) => (
              <li key={index}>
                <a
                  href={`https://${resource.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.resource_name}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      {goal.study_plans.length > 0 && (
        <>
          <h3 className={classes.text}>Study Plan</h3>
          <ul className={classes.list}>
            {goal.study_plans.map((plan, index) => (
              <li key={index}>
                {plan.topic} - {plan.status}
              </li>
            ))}
          </ul>
        </>
      )}

    
    </div>
  );
}

export default ExamGoal;
