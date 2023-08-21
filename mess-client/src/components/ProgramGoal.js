import React, { useState, useEffect } from "react";
import {
  Tab,
  Tabs,
  Box,
  Button,
  TextField,
  Dialog,
  Typography,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
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
  text: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "4px",
    marginTop: "2.2%",
  },
  list: {
    margin: "10px 0",
    paddingLeft: "25px",
    marginTop: "1%",
    marginBottom: "0px",
  },
  textField: {
    marginTop: "2% !important",
    marginBottom: "1% !important",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "0.5%",
  },
  addButton: {
    fontSize: "0.97rem !important",
    width: "165px !important",
    marginTop: "3.3% !important",
    padding: "10px 20px !important",
    display: "block !important",
    backgroundColor: "#CCC2F2 !important",
    color: "#6E37A6 !important", 
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1) !important", 
    transition: "boxShadow .3s ease, transform .3s ease !important",
    "&:hover !important": {
      backgroundColor: "#E6E0FF !important", 
      boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.1) !important", 
      transform: "translateY(-2px) !important",
    },
    dialogContent: {
      height: "500px", 
    },
  },
  saveButton: {
    backgroundColor: "#DEDEDE !important",
    color: "black !important",
    "&:hover !important": {
      backgroundColor: "#FF8E8E !important",
    },
  },
  cancelButton: {
    backgroundColor: "#4A4A4A !important",
    color: "#fff !important",
    "&:hover !important": {
      backgroundColor: "#555 !important",
      transform: "scale(1.05) !important",
    },
  },
  paper: {
    minWidth: "450px !important",
  },
  dialogContent: {
    padding: "8px 24px 8px 24px !important",
  },
}));

function ProgramGoal({ goal }) {
  const classes = useStyles();

  const [modules, setModules] = useState(goal.modules || []);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [editStatus, setEditStatus] = useState("Complete");
  const [programData, setProgram] = useState(null);
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const completedModules = modules.filter(
    (module) => module.status === "Complete"
  );
  const ongoingModules = modules.filter(
    (module) => module.status === "In-Progress"
  );
  const registeredModules = modules.filter(
    (module) => module.status === "Registered"
  );

  const updateModuleStatus = () => {
    setProgram({
      module_id: selectedTitle,
      status: editStatus,
      reference_id: goal.goal_id,
    });
    setShouldSubmit(true);
  };

  useEffect(() => {
    if (!shouldSubmit || !programData) return;

    fetch("http://localhost:8080/module", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(programData),
    })
      .then((response) => {
        window.location.reload();
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          setOpenDialog(false);
          setProgram({
            title: "",
            status: "",
          });
        }
      })
      .catch((error) => {
        alert("An error occurred. Please try again.");
        console.error("Error:", error);
      })
      .finally(() => {
        setShouldSubmit(false);
      });
  }, [shouldSubmit, programData]);

  return (
    <div className={classes.container}>
      <h2 className={classes.font}>{goal.title}</h2>
      <p className={classes.text}>
        <strong>Start Date:</strong>{" "}
        {moment(goal.start_date).format("MMMM D, YYYY")}
      </p>
      <p className={classes.text}>
        <strong>End Date:</strong>{" "}
        {moment(goal.end_date).format("MMMM D, YYYY")}
      </p>
      <p className={classes.text}>
        <strong>Location:</strong>{" "}
        {`${goal.city}, ${goal.state}, ${goal.country}`}
      </p>
      <p className={classes.text}>
        <strong>Total Modules:</strong> {goal.total_modules}
      </p>

      {goal.completed_modules > 0 && (
        <>
          <h3 className={classes.text}>
            Completed Modules ({goal.completed_modules})
          </h3>
          <ul className={classes.list}>
            {completedModules.map((module) => (
              <li key={module.module_id}>
                <strong>Name: </strong>
                {module.title}
              </li>
            ))}
          </ul>
        </>
      )}

      {ongoingModules.length > 0 && (
        <>
          <h3 className={classes.text}>In-Progress Modules</h3>
          <ul className={classes.list}>
            {ongoingModules.map((module) => (
              <li key={module.module_id}>
                <strong>Name: </strong>
                {module.title}
              </li>
            ))}
          </ul>
        </>
      )}

      {registeredModules.length > 0 && (
        <>
          <h3 className={classes.text}>Registered Modules</h3>
          <ul className={classes.list}>
            {registeredModules.map((module) => (
              <li key={module.module_id}>
                <strong>Name: </strong>
                {module.title}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          className={classes.addButton}
        >
          Edit Modules
        </Button>
      </div>

      <Dialog
        classes={{ paper: classes.paper }}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <Box sx={{ width: "100%" }}>
          <DialogContent className={classes.dialogContent}>
            {ongoingModules.length > 0 || registeredModules.length > 0 ? (
              <>
                <FormControl className={classes.textField} fullWidth>
                  <InputLabel>Select Module to Modify</InputLabel>
                  <Select
                    value={selectedTitle}
                    onChange={(e) => setSelectedTitle(e.target.value)}
                  >
                    {[...ongoingModules, ...registeredModules].map((module) => (
                      <MenuItem key={module.module_id} value={module.module_id}>
                        {module.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth className={classes.textField}>
                  <InputLabel>New Status</InputLabel>
                  <Select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    {selectedTitle?.status === "Complete" && (
                      <MenuItem value="Complete">Complete</MenuItem>
                    )}
                    {selectedTitle?.status === "Registered" && (
                      <MenuItem value="In-Progress">In Progress</MenuItem>
                    )}

                    <MenuItem value="Complete">Complete</MenuItem>
                  </Select>
                </FormControl>
              </>
            ) : (
              <Typography variant="body1">
                All modules are completed!
              </Typography>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={updateModuleStatus} className={classes.saveButton}>
              Update Status
            </Button>
            <Button
              className={classes.cancelButton}
              onClick={() => setOpenDialog(false)}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default ProgramGoal;
