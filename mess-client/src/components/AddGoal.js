import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import {
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { mockTests, militaryBases, mockGoals, mockCerts } from "./data";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import PropTypes from 'prop-types';

AddGoal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  goalType: PropTypes.string.isRequired,
};


const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: "2px !important",
    backgroundColor: "#DEDEDE !important",
    color: "black !important",
    "&:hover !important": {
      backgroundColor: "#FF8E8E !important",
    },
  },
  cancelButton: {
    margin: "2px !important",
    backgroundColor: "#4A4A4A !important",
    color: "#fff !important",
    "&:hover !important": {
      backgroundColor: "#555 !important",
      transform: "scale(1.05) !important",
    },
  },
  paper: {
    width: "450px",
  },
}));

function AddGoal({ open, onClose, goalType }) {
  const classes = useStyles();

  const [goal, setGoal] = useState([]);
  const [category, setCategory] = useState("");

  const [title, setTitle] = useState("");

  // Degree Goal State Variables
  const [school, setSchool] = useState("");
  const [degreeType, setDegreeType] = useState("");
  const [major, setMajor] = useState("");
  const [completedCredits, setCompletedCredits] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [modeOfStudy, setModeOfStudy] = useState("");

  // Program State Variables
  const [online, setOnline] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [modules, setModules] = useState(0);

  // Exam Goal State Variables
  const [examType, setExamType] = useState("DSST");
  const [examDate, setExamDate] = useState("");
  const [testType, setTestType] = useState("");
  const [examName, setExamName] = useState("");

  // Certification Goal State Variables
  const [certs, setCertifications] = useState(null);
  const [certificationId, setCertificationId] = useState(0);
  const [certId, setCertId] = useState(0);

  const [testingCenters, setTestingCenters] = useState([]);
  const [testingCenter, setTestingCenter] = useState();
  const [testDate, setTestDate] = useState();

  // Location Variables
  const [country, setCountry] = useState("United States");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const fetchCountriesAndSetStates = () => {
    fetch(`https://countriesnow.space/api/v0.1/countries/states`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.data);
      })
      .catch((error) =>
        console.error("Error fetching countries:", error.message)
      );
  };

  const fetchCitiesAndSet = () => {
    if (!state || !country) return;
    fetch(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: country.name,
        state: state.name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCities(data.data);
      })
      .catch((error) => console.error("Error fetching cities:", error.message));
  };

  useEffect(() => {
    fetchCountriesAndSetStates();
  }, []);

  useEffect(() => {
    fetchCitiesAndSet();
  }, [state, country]);

  const handleCountryChange = (event) => {
    const country = countries.find(
      (country) => country.name === event.target.value
    );
    setCountry(country);

    if (country) {
      setStates(country.states);
    } else {
      setStates([]);
    }
  };

  const handleStateChange = (event) => {
    const state = states.find((state) => state.name === event.target.value);
    setState(state);
  };

  const handleCityChange = (event) => {
    const city = cities.find((c) => c === event.target.value);
    setCity(city);
  };

  // Testing Centers
  useEffect(() => {
    let getTestingCenters = async () => {
      try {
        let response = await fetch("http://localhost:8080/testing-centers");

        let data = await response.json();
        setTestingCenters(data);
      } catch (error) {
        console.error("Error fetching testing centers:", error);
      }
    };
    getTestingCenters();
  }, []);

  useEffect(() => {
    let getCerts = async () => {
      try {
        let response = await fetch("http://localhost:8080/certifications");

        let data = await response.json();
        setCertifications(data);
      } catch (error) {
        console.error("Error fetching testing centers:", error);
      }
    };
    getCerts();
  }, []);

  const addDegreeGoal = async (newGoal) => {
    try {
      const response = await fetch("http://localhost:8080/degree-goal", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
        onClose();
      })
    } catch (err) {
      console.error("Error adding degree goal:", err);
    }
  };

  const addProgramGoal = (newGoal) => {
    return fetch("http://localhost:8080/program-goal", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoal)
    })
    .then((response) => response.json())
    .then(() => {
      window.location.reload();
      onClose();
    })
      .catch((err) => {
        console.error("Error adding program goal:", err.message);
        return false;
      });
  };

  const addCertGoal = async (newGoal) => {
    try {
      const response = await fetch("http://localhost:8080/cert-goal", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      });
      if (response.ok) {
        return true;
      } else {
        console.error(`Error adding degree goal. Status: ${response.status}`);
        return false;
      }
    } catch (err) {
      console.error("Error adding degree goal:", err);
    }
  };

  const addExamGoal = async (newGoal) => {
    try {
      const response = await fetch("http://localhost:8080/exam-goal", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      });
      if (response.ok) {
        return true;
      } else {
        console.error(`Error adding degree goal. Status: ${response.status}`);
        return false;
      }
    } catch (err) {
      console.error("Error adding degree goal:", err);
    }
  };

  const goalHandlers = {
    "Degree-Based": () => {
      return {
        school: school,
        degree_type: degreeType,
        major: major,
        mode_of_study: modeOfStudy,
        start_date: startDate,
        total_credits_required: completedCredits,
        city: city,
        state: state.name,
        country: country.name,
      };
    },
    "Program-Based": () => {
      return {
        title: title,
        country: country?.name,
        state: state?.name,
        city: city?.name,
        start_date: startDate,
        end_date: endDate,
        modules: modules,
        online: online,
      };
    },
    "Certification": () => {
      return {
        id: certId
      };
    },
    "Exam": () => {
      return {
        test_type: testType,
        exam_name: examName,
        center_id: testingCenter,
        exam_date: examDate,
      };
    },
  };

  const addHandlers = {
    "Degree-Based": addDegreeGoal,
    "Program-Based": addProgramGoal,
    "Certification": addCertGoal,
    "Exam": addExamGoal
  };

  const handleSubmit = (e) => {
    const handler = goalHandlers[category];

    if (!handler) {
      console.error(`Invalid category: ${category}`);
      return;
    }

    const newGoal = handler();
    const addHandler = addHandlers[category];

    if (addHandler) {
      addHandler(newGoal).then((isSuccessful) => {
        if (isSuccessful) {
          onClose();
        }
      });
    }
  };

  return (
    <Dialog classes={{ paper: classes.paper }} open={open} onClose={onClose}>
      <DialogTitle>
        {goalType === 4 ? "Add Upcoming Exam" : "Add New Goal"}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {goalType === 4 ? (
          <div style={{ width: "400px" }}>
            <TextField
              fullWidth
              margin="normal"
              label="Type"
              select
              value={testType}
              onChange={(e) => {
                setTestType(e.target.value);;
                setCategory("Exam");
              }}
            >
              <MenuItem value="DSST">DSST</MenuItem>
              <MenuItem value="CLEP">CLEP</MenuItem>
            </TextField>

            <TextField
              fullWidth
              margin="normal"
              label="Test Name"
              select
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
            >
              {testType &&
                mockTests
                  .filter((test) => test.type === testType)
                  .map((test) => (
                    <MenuItem key={test.id} value={test.id}>
                      {test.title}
                    </MenuItem>
                  ))}
            </TextField>

            <TextField
              fullWidth
              margin="normal"
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

            <TextField
              fullWidth
              margin="normal"
              label="Date"
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        ) : (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Category"
              select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="Degree-Based">Degree-Based</MenuItem>
              <MenuItem value="Program-Based">Program-Based</MenuItem>
              <MenuItem value="Certification">Certification</MenuItem>
            </TextField>

            {category === "Degree-Based" && (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Institution"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Degree Type"
                  select
                  value={degreeType}
                  onChange={(e) => setDegreeType(e.target.value)}
                >
                  <MenuItem value="Associate">Associate</MenuItem>
                  <MenuItem value="Bachelor's">Bachelor's</MenuItem>
                  <MenuItem value="Master's">Master's</MenuItem>
                  <MenuItem value="Doctorate">Doctorate</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Major"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Mode of Study"
                  select
                  value={modeOfStudy}
                  onChange={(e) => setModeOfStudy(e.target.value)}
                >
                  <MenuItem value="On-Campus">On-Campus</MenuItem>
                  <MenuItem value="Online">Online</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true, required: true }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Required Credits"
                  type="integer"
                  InputLabelProps={{ shrink: true, required: true }}
                  value={completedCredits}
                  onChange={(e) => setCompletedCredits(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Country"
                  select
                  value={country?.name}
                  onChange={handleCountryChange}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.iso3} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  margin="normal"
                  label="State"
                  select
                  value={state?.name}
                  onChange={handleStateChange}
                >
                  {states.map((states) => (
                    <MenuItem key={states.state_code} value={states.name}>
                      {states.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  margin="normal"
                  label="City"
                  select
                  value={city?.name}
                  onChange={handleCityChange}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            )}

            {category === "Program-Based" && (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField fullWidth margin="normal" label="Program" />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Country"
                  select
                  value={country?.name}
                  onChange={handleCountryChange}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.iso3} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  margin="normal"
                  label="State"
                  select
                  value={state?.name}
                  onChange={handleStateChange}
                >
                  {states.map((states) => (
                    <MenuItem key={states.state_code} value={states.name}>
                      {states.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  margin="normal"
                  label="City"
                  select
                  value={city?.name}
                  onChange={handleCityChange}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true, required: true }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true, required: true }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Total Modules"
                  type="integer"
                  InputLabelProps={{ shrink: true, required: true }}
                  value={modules}
                  onChange={(e) => setModules(e.target.value)}
                />
                <FormGroup>
                  <FormControlLabel
                    label="Is it online?"
                    control={
                      <Checkbox
                        checked={online}
                        onChange={(e) => setOnline(e.target.checked)}
                      />
                    }
                  />
                </FormGroup>
              </>
            )}

            {category === "Certification" && (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  select
                  label="Certifying Body"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                >
                  {certs.map((cert) => (
                    <MenuItem key={cert.cert_id} value={cert.cert_id}>
                      {cert.title}
                    </MenuItem>
                  ))}
                </TextField>

              </>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.addButton}
          onClick={handleSubmit}
          color="primary"
        >
          {category === "Exam" ? "Add Exam" : "Add Goal"}
        </Button>

        <Button
          className={classes.cancelButton}
          onClick={onClose}
          color="secondary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default AddGoal;
