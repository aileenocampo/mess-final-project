
import React, { useState, useEffect } from "react";
import {
  DialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Tabs,
  Tab,
  Typography,
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
    marginBottom: "2% !important",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "0.5%",
  },
  addButton: {
    fontSize: "1rem !important",
    width: "160px !important",
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
  },
  saveButton: {
    marginBottom: "0px !important",
    backgroundColor: "#DEDEDE !important",
    color: "black !important",
    "&:hover !important": {
      backgroundColor: "#FF8E8E !important",
    },
  },
  cancelButton: {
    marginBottom: "0px !important",
    backgroundColor: "#4A4A4A !important",
    color: "#fff !important",
    "&:hover !important": {
      backgroundColor: "#555 !important",
      transform: "scale(1.05) !important",
    },
  },
  paper: {
    width: "385px",
  },
}));

function CertificationGoal({ goal }) {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [rExam, setRExam] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [testDate, setTestDate] = useState("");
  const [rStatus, setRStatus] = useState("");
  const [status, setStatus] = useState("");
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [payload, setPayload] = useState(null);
  const [programData, setProgram] = useState(null);

  const completedExams = goal.exams.filter((exam) => exam.status === "Passed");
  const registeredExams = goal.exams.filter(
    (exam) => exam.status === "Registered"
  );
  const unregisteredExams = goal.exams.filter(
    (exam) => exam.status === "Unregistered"
  );
  const failedExams = goal.exams.filter((exam) => exam.status === "Failed");
  const untaken = goal.exams.filter((exam) => exam.status === null);
  const modifiableExams = [...registeredExams, ...failedExams, ...untaken];
 
  return (
    <div className={classes.container}>
      <h2 className={classes.font}>{goal.title}</h2>
      <p className={classes.text}>
        <strong>Certifying Body:</strong> {goal.certifying_body}
      </p>
      <p className={classes.text}>
        <strong>Total Exams:</strong> {goal.total_exams}
      </p>

      {completedExams.length > 0 && (
        <>
          <h3 className={classes.text}>Completed Exams</h3>
          <ul className={classes.list}>
            {completedExams.map((exam) => (
              <li key={exam.exam_id}>
                {exam.title} - {moment(exam.test_date).format("LL")}
              </li>
            ))}
          </ul>
        </>
      )}

      {registeredExams.length > 0 && (
        <>
          <h3 className={classes.text}>Registered Exams</h3>
          <ul className={classes.list}>
            {registeredExams.map((exam) => (
              <li key={exam.cert_exam_id}>
                {exam.title} - {moment(exam.test_date).format("LL")}
              </li>
            ))}
          </ul>
        </>
      )}

      {failedExams.length > 0 && (
        <>
          <h3 className={classes.text}>Failed Exams</h3>
          <ul className={classes.list}>
            {failedExams.map((exam) => (
              <li key={exam.cert_exam_id}>
                {exam.title} - {moment(exam.test_date).format("LL")}
              </li>
            ))}
          </ul>
        </>
      )}

      {unregisteredExams.length > 0 && (
        <>
          <h3 className={classes.text}>Unregistered Exams</h3>
          <ul className={classes.list}>
            {unregisteredExams.map((exam) => (
              <li key={exam.cert_exam_id}>{exam.title}</li>
            ))}
          </ul>
        </>
      )}

      <h3 className={classes.text}>Study Resources</h3>
      <ul className={classes.list}>
        {goal.study_resources.map((exam, index) => (
          <li key={index}>
            <a href={exam.url} target="_blank" rel="noopener noreferrer">
              {exam.resource_name}
            </a>
          </li>
        ))}
      </ul>

    
    </div>
  );
}

export default CertificationGoal;
