import React from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import LinearProgress from "@mui/material/LinearProgress";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  goalCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center ",
    justifyContent: "center",
    borderRadius: "12px !important",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f7f7f7 !important",
    paddingLeft: "6%",
    paddingRight: "6%",
    minHeight: "calc(28vh + 5em)",
    maxHeight: "28vh",
    minWidth: "calc(27vw + 3em)",
    maxWidth: "27vw",
    overflow: "hidden",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    [theme.breakpoints.up("lg")]: {
      paddingBottom: "0px", //
    },
    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
  },
  goalTitle: {
    fontSize: "1.4em",
    fontWeight: "600",
    marginTop: "0px",
  },
  goalProgressLabel: {
    fontSize: ".9em !important",
    color: "#777",
    marginBottom: "5% !important",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.up("lg")]: {
      marginTop: "15%", 
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
  viewDetailsButton: {
    margin: "2px !important",
    backgroundColor: "#DEDEDE !important",
    color: "black !important",
    "&:hover !important": {
      backgroundColor: "#FF8E8E !important",
    },
  },
  deleteButton: {
    margin: "2px !important",
    backgroundColor: "#4A4A4A !important",
    color: "#fff !important",
    "&:hover !important": {
      backgroundColor: "#555 !important",
      transform: "scale(1.05) !important",
    },
  },
  linkStyle: {
    textDecoration: "none",
    color: "inherit",
  },
}));

function LinearProgressWithLabel(props) {
  const classes = useStyles();

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={{ width: "21vw", mr: 1 }}>
        <LinearProgress
          className={classes.progressBar}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function GoalCard({ goal }) {
  const classes = useStyles();

  let progress = 0;
  let progressLabel = "";
  let cardTitle = goal.title;

  switch (goal.goal_type_id) {
    case 1:
      cardTitle = `${goal.degree_type} in ${goal.major}`;

      progress = (goal.completed_credits / goal.total_credits_required) * 100;
      progressLabel = `Credits Completed: ${goal.completed_credits}/${goal.total_credits_required}`;
      break;
    case 2:
      progress = (goal.completed_modules / goal.total_modules) * 100;
      progressLabel = `Modules Completed: ${goal.completed_modules}/${goal.total_modules}`;
      break;
    case 3:
      progress = (goal.completed_cert_exams / goal.total_exams) * 100;
      progressLabel = `Exams Passed: ${goal.completed_cert_exams}/${goal.total_exams}`;
      break;
    case 4:
      cardTitle = `${goal.type} - ${goal.title}`;

      if (goal.status === "Passed") {
        progress = 100;
        progressLabel = "Passed";
      } else if (goal.status === "Failed") {
        progress = 0;
        progressLabel = "Failed";
      } else {
        progress = 0;
        progressLabel = `Exam Date: ${moment(goal.test_date).format("LL")}`;
      }
      break;
    default:
      break;
  }

  const handleDelete = async (goalId, goalTypeId, referenceId) => {
    switch (goalTypeId) {
      case 1:
        await deleteDegreeGoal(goalId, referenceId);
        break;
      case 2:
        await deleteProgramGoal(goalId, referenceId);
        break;
      case 3:
        await deleteCertGoal(goalId, referenceId);
        break;
      case 4:
        await deleteExamGoal(goalId, referenceId);
        break;
      default:
        console.log("Invalid goal type id");
    }
  };
  const deleteDegreeGoal = async (goalId, referenceId) => {
    try {
      console.log("Handle Delete called with:", goalId, referenceId);
      const response = await fetch(`http://localhost:8080/degree-goal`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal_id: goalId,
          reference_id: referenceId,
        }),
      });
              window.location.reload();
      return response.json();
    } catch (error) {
      throw error;
    }
  };
  const deleteProgramGoal = async (goalId, referenceId) => {
    try {
      console.log(
        "Deleting program goal with ID:",
        goalId,
        "and reference ID:",
        referenceId
      );
      const response = await fetch(`http://localhost:8080/program-goal`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal_id: goalId,
          reference_id: referenceId,
        }),
      });
      window.location.reload();
      return response.json();
    } catch (error) {
      console.error("Error deleting program goal:", error);
      throw error;
    }
  };

  const deleteCertGoal = async (goalId, referenceId) => {
    try {
      console.log(
        "Deleting certification goal with ID:",
        goalId,
        "and reference ID:",
        referenceId
      );
      const response = await fetch(`http://localhost:8080/cert-goal`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal_id: goalId,
          reference_id: referenceId,
        }),
      });

      window.location.reload();
      return response.json();
    } catch (error) {
      console.error("Error deleting certification goal:", error);
      throw error;
    }
  };

  const deleteExamGoal = async (goalId, referenceId) => {
    try {
      console.log(
        "Deleting exam goal with ID:",
        goalId,
        "and reference ID:",
        referenceId
      );
      const response = await fetch(`http://localhost:8080/exam-goal`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal_id: goalId,
          reference_id: referenceId,
        }),
      });
      window.location.reload();
      return response.json();
    } catch (error) {
      console.error("Error deleting exam goal:", error);
      throw error;
    }
  };

  return (
    <Box>
      <Card variant="outlined" className={classes.goalCard}>
        <div className={classes.cardContentContainer}>
          <h3 className={classes.goalTitle}>{cardTitle}</h3>
          <LinearProgressWithLabel value={progress} />
          <Typography className={classes.goalProgressLabel}>
            {progressLabel}
          </Typography>
        </div>
        <div className={classes.actions}>
          <Button className={classes.viewDetailsButton}>
            <Link className={classes.linkStyle} to={`/goals/${goal.goal_id}`}>
              View Details
            </Link>
          </Button>
          <Button
            className={classes.deleteButton}
            onClick={() =>
              handleDelete(goal.goal_id, goal.goal_type_id, goal.reference_id)
            }
          >
            Delete Goal
          </Button>
        </div>
      </Card>
    </Box>
  );
}

export default GoalCard;
