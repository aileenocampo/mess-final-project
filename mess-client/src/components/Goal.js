import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import DegreeGoal from "./DegreeGoal";
import ProgramGoal from "./ProgramGoal";
import CertGoal from "./CertGoal";
import ExamGoal from "./ExamGoal";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: "3.5%",
    paddingTop: "3.5%",
  },
}));

function Goal({ onDelete }) {
  const classes = useStyles();
  const { id } = useParams();

  const [goal, setGoal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [error, setError] = useState(null);

  const serverURL = "http://localhost:8080";

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch(`${serverURL}/goals/${id}`);
        if (response.ok) {
          const fetchedGoal = await response.json();
          setGoal(fetchedGoal);
          setEditingGoal(fetchedGoal);
        } else {
          setError("Goal not found");
        }
      } catch (err) {
        setError("Error fetching goal: " + err.message);
      }
    };

    fetchGoal();
  }, [id]);

  const handleEditChange = (key, value) => {
    setEditingGoal((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setGoal(editingGoal);
    setIsEditing(false);
  };

  return (
    <div className={classes.container}>
      {goal && goal.goal_type_id === 1 && <DegreeGoal goal={goal} />}
      {goal && goal.goal_type_id === 4 && (
        <ExamGoal
          goal={isEditing ? editingGoal : goal}
          isEditing={isEditing}
          onEditChange={handleEditChange}
          handleSave={handleSave}
          onDelete={onDelete}
          setIsEditing={setIsEditing}
        />
      )}
      {goal && goal.goal_type_id === 2 && <ProgramGoal goal={goal} />}
      {goal && goal.goal_type_id === 3 && <CertGoal goal={goal} />}

      {error && <p>{error}</p>}
    </div>
  );
}

export default Goal;
