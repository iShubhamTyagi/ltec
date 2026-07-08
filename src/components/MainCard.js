import React, { useState, useEffect, useContext } from "react";
import questionCardSequences from "./QuestionCardSequences";
import Buttons from "./Buttons";
import FinalCard from "./FinalCard";
import Header from "./Header";
import Footer from "./Footer";
import storeData from './DataStorage';
import { UserContext } from "./UserContext";

const DISEASE_SUBTITLES = [
  "Chronic Obstructive Pulmonary Disease",
  "Interstitial Lung Disease",
  "Chronic Suppurative Lung Disease",
];

const initialState = {
  selectedSequence: null,
  currentCardIndex: 0,
  userSelection: "",
  answers: {},
  verdicts: {},
  age: "",
  id: "",
  sex: "",
  timer: 0,
};

function MainCard() {
  const [state, setState] = useState(initialState);
  const [isFinalCardShown, setIsFinalCardShown] = useState(false);
  const [currentVerdicts, setCurrentVerdicts] = useState({});
  const [overallVerdict, setOverallVerdict] = useState({});
  const [timer, setTimer] = useState(0);
  const { username, password } = useContext(UserContext);

  const {
    selectedSequence,
    currentCardIndex,
    userSelection,
    answers,
    verdicts,
    age,
    id,
    sex,
  } = state;

  const handleNext = () => {
    if (selectedSequence !== null) {
      const totalCards = questionCardSequences[selectedSequence]?.cards.length;
      if (currentCardIndex < totalCards) {
        setState((prevState) => ({
          ...prevState,
          currentCardIndex: prevState.currentCardIndex + 1,
        }));
      } else if (currentCardIndex === totalCards) {
        calculateOverallVerdict(verdicts);
        setIsFinalCardShown(true);
      }
    }
  };

  const calculateOverallVerdict = (verdicts) => {
    const eligibleVerdicts = Object.values(verdicts).slice(0, 2);
    const yesNoVerdicts = Object.values(verdicts).slice(2, 4);
    if (eligibleVerdicts.length === 2 && yesNoVerdicts.length === 2) {
      if (
        eligibleVerdicts.every((verdict) => verdict === "Eligible") &&
        yesNoVerdicts.every((verdict) => verdict === "No")
      ) {
        setOverallVerdict("Eligible");
      } else {
        setOverallVerdict("Ineligible");
      }
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 1) {
      setState((prevState) => ({
        ...prevState,
        currentCardIndex: prevState.currentCardIndex - 1,
      }));
    } else if (currentCardIndex === 1) {
      setState(initialState);
    }
  };

  const handleClear = () => {
    setState(initialState);
    setIsFinalCardShown(false);
  };

  const handleSelection = (index) => {
    const sequence = Number(index);
    setState((prevState) => ({
      ...prevState,
      selectedSequence: sequence,
      currentCardIndex: 1,
      userSelection: questionCardSequences[sequence].label,
    }));
  };

  const handleInputChange = (event, field) => {
    const value = event.target.value;
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const setAnswers = (index, answer) => {
    setState((prevState) => {
      const updatedAnswers = { ...prevState.answers };
      const key = `${currentCardIndex}-${index}`;
      updatedAnswers[key] = answer;
      return { ...prevState, answers: updatedAnswers };
    });
  };

  const setVerdict = (cardIndex, verdict) => {
    setState((prevState) => ({
      ...prevState,
      verdicts: {
        ...prevState.verdicts,
        [cardIndex]: verdict,
      },
    }));
    setCurrentVerdicts((prevVerdicts) => ({
      ...prevVerdicts,
      [cardIndex]: verdict,
    }));
  };

  useEffect(() => {
    setCurrentVerdicts(verdicts);
  }, [verdicts]);

  const updateTimer = (timer) => {
    setTimer(timer);
  };

  useEffect(() => {
    if (currentCardIndex > questionCardSequences[selectedSequence]?.cards.length) {
      setIsFinalCardShown(true);
    }
  }, [currentCardIndex, selectedSequence, answers]);

  useEffect(() => {
    if (isFinalCardShown && timer !== 0) {
      storeData(
        selectedSequence,
        age,
        id,
        sex,
        answers,
        verdicts,
        overallVerdict,
        timer,
        username,
        password
      );
    }
    // eslint-disable-next-line
  }, [overallVerdict, timer]);

  const totalCards = questionCardSequences[selectedSequence]?.cards.length || 1;
  const progress = ((currentCardIndex - 1) / totalCards) * 100;
  const isFormValid = age && id && sex;

  if (isFinalCardShown) {
    return (
      <div className="app-shell">
        <Header userSelection={userSelection} progress={100} updateTimer={updateTimer} />
        <FinalCard
          handleClear={handleClear}
          age={age}
          id={id}
          sex={sex}
          verdicts={currentVerdicts}
          overallVerdict={overallVerdict}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header
        userSelection={userSelection}
        progress={Math.min(progress, 100)}
        updateTimer={updateTimer}
      />

      <main className="page">
        {selectedSequence === null ? (
          <>
            <div className="intro">
              <h1>Patient Assessment</h1>
              <p>Enter patient details, then select the primary diagnosis to begin.</p>
            </div>
            <div className="intake">
              {/* Step 1 — Patient Details */}
              <div className="card intake-card">
                <div className="section-head">
                  <span className="n">1</span>
                  <h2>Patient Details</h2>
                  <span className="hint">All fields required</span>
                </div>
                <div className="intake-grid">
                  <div className="field">
                    <label htmlFor="patient-age">Age</label>
                    <input
                      id="patient-age"
                      className="field-input"
                      type="text"
                      placeholder="e.g. 58"
                      value={age}
                      onChange={(event) => handleInputChange(event, "age")}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="patient-id">ID</label>
                    <input
                      id="patient-id"
                      className="field-input"
                      type="text"
                      placeholder="Patient ID"
                      value={id}
                      onChange={(event) => handleInputChange(event, "id")}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="patient-sex">Sex</label>
                    <select
                      id="patient-sex"
                      className="field-select"
                      value={sex}
                      onChange={(event) => handleInputChange(event, "sex")}
                    >
                      <option value="">Select…</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2 — Disease Selection */}
              <div className="card intake-card">
                <div className="section-head">
                  <span className="n">2</span>
                  <h2>Choose Patient's Disease</h2>
                </div>
                <div className="disease-grid">
                  {questionCardSequences.map((sequence, index) => (
                    <label
                      key={index}
                      className={`disease-card${selectedSequence === index ? " sel" : ""}${!isFormValid ? " disabled" : ""}`}
                    >
                      <input
                        type="radio"
                        name="disease"
                        value={String(index)}
                        disabled={!isFormValid}
                        checked={selectedSequence === index}
                        onChange={() => handleSelection(index)}
                        style={{
                          position: "absolute",
                          opacity: 0,
                          width: 0,
                          height: 0,
                        }}
                      />
                      <div className="dc-name">{sequence.label}</div>
                      <div className="dc-sub">{DISEASE_SUBTITLES[index]}</div>
                      <div className="dc-check">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </label>
                  ))}
                </div>
                {!isFormValid && (
                  <div className="intake-lock">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Fill patient details above to enable disease selection.
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {questionCardSequences[selectedSequence].cards.map((card, index) => (
              <div
                key={index}
                style={{ display: index === currentCardIndex - 1 ? "block" : "none" }}
              >
                {React.cloneElement(card, {
                  answers,
                  setAnswers,
                  setVerdict,
                  currentCardIndex,
                })}
              </div>
            ))}
          </>
        )}

        <Buttons
          handleClear={handleClear}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </main>

      <Footer />
    </div>
  );
}

export default MainCard;
