import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import AddGoal from "./AddGoal";
import GoalCard from "./GoalCard";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: "bold",
    color: "#DAA520",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.05)",
    textTransform: "uppercase",
    fontSize: "calc(14px + 2.4vw)",
    marginBottom: "2%",
    marginTop: "4%",
    paddingLeft: "30px",
    position: "relative",
  },
  test: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  goalCard: {
    flex: "1 1 calc(50% - 20px)",
    margin: "10px",
    maxWidth: "calc(50% - 20px)",
    paddingLeft: "20px",
    paddingRight: "50px",
    boxSizing: "border-box",

    "@media (max-width: 800px)": {
      flex: "1 1 100%",
      maxWidth: "100%",
    },
    "@media (max-width: 500px)": {
      flex: "1 1 100%",
      maxWidth: "100%",
    },
  },
  addButtonDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: "32px",
    paddingTop: "3%",
  },
  addButton: {
    width: "15rem",
    fontSize: "1rem !important",
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
}));

const serverURL = "http://localhost:8080";

const fetchGoals = async () => {
  try {
    const response = await fetch(`${serverURL}/goals`);
    return await response.json();
  } catch (err) {
    console.error("Error fetching goals:", err);
    return [];
  }
};

function Goals() {
  const classes = useStyles();

  const [goals, setGoals] = useState([]);
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  const [goalType, setGoalType] = useState(null);

  const [educationalGoals, setEdGoals] = useState([]);
  const [examGoals, setExamGoals] = useState([]);

  const openAddGoalForm = (type) => {
    setGoalType(type);
    setShowAddGoalForm(true);
  };

  const handleAddGoal = () => {
    console.log("Closing form...");
    setShowAddGoalForm(false);
  };

  useEffect(() => {
    fetchGoals().then((allGoals) => {
      const dGoals = allGoals.filter((goal) => goal.goal_type_id !== 4);
      const eGoals = allGoals.filter((goal) => goal.goal_type_id === 4);

      setEdGoals(dGoals);
      setExamGoals(eGoals);
    });
  }, []);

  return (
    <div>
      <h2 className={classes.title}>Education Goals</h2>
      {educationalGoals.length > 0 && (
        <div className={classes.test} style={{ textAlign: "center" }}>
          {educationalGoals.map((goal) => (
            <div className={classes.goalCard} key={goal.goal_id}>
              <GoalCard goal={goal} />
            </div>
          ))}
        </div>
      )}

      <div className={classes.addButtonDiv}>
        <Button
          className={classes.addButton}
          onClick={() => openAddGoalForm(1)}
        >
          Add Goal
        </Button>
      </div>

      <h2 className={classes.title}>Upcoming Exams</h2>
      {examGoals.length > 0 && (
        <div className={classes.test} style={{ textAlign: "center" }}>
          {examGoals.map((goal) => (
            <div className={classes.goalCard} key={goal.goal_id}>
              <GoalCard goal={goal} />
            </div>
          ))}
        </div>
      )}

      <div className={classes.addButtonDiv}>
        <Button
          className={classes.addButton}
          onClick={() => openAddGoalForm(4)}
        >
          Add Exam
        </Button>
      </div>

      <AddGoal
        open={showAddGoalForm}
        onClose={() => {
          setShowAddGoalForm(false);
          setGoalType(null);
          window.location.reload();
        }}
        goalType={goalType}
      />
    </div>
  );
}

export default Goals;
