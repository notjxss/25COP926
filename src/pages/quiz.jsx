import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(null);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    fetch(`/backend/checkPlayedToday.php?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.played) setAlreadyPlayed(true);
      });

    fetch("/backend/getDailyQuiz.php")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const choose = (option) => {
    if (!checked) setSelected(option);
  };

  const checkAnswer = () => {
    if (!selected) return;
    setChecked(true);
  };

  const nextQuestion = () => {
    setSelected(null);
    setChecked(false);
    setIndex(index + 1);
  };

  const finishQuiz = () => {
    let s = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct_option) s++;
    });
    setScore(s);
    setFinished(true);

    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetch("/backend/submitScore.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, score: s })
      });
    }
  };

  // LOCK SCREEN
  if (alreadyPlayed) {
    return (
      <div className="quiz-lock card centered">
        <h2>You've Already Played Today!</h2>
        <p>Come back tomorrow for a brand‑new quiz.</p>
        <button className = "btn" onClick={() => navigate("/")}>Return Home</button>
      </div>
    );
  }

  if (!questions.length) return <p className="loading">Loading quiz...</p>;

  if (finished) {
    return (
      <div className="quiz-result card centered">
        <h2>Your Score: {score}/{questions.length}</h2>
        <p>Check the leaderboard on the home page!</p>
        <button className = "btn" onClick={() => navigate("/")}>Return Home</button>
      </div>
    );
  }

  const q = questions[index];

  return (
    <div className="quiz-container">
      <h2>Daily Quiz</h2>

      {/* WARNING IF NOT LOGGED IN */}
      {!localStorage.getItem("user_id") && (
        <p className="quiz-warning">
          Your score won’t be saved because you’re not logged in.
        </p>
      )}

      {/* PROGRESS BAR */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="quiz-card card">
        <h3>{q.question}</h3>

        <div className="options">
          {["A", "B", "C", "D"].map((opt) => {
            const text = q[`option_${opt.toLowerCase()}`];

            let className = "option-btn";

            if (selected === opt) className += " selected";

            if (checked) {
              if (opt === q.correct_option) className += " correct";
              else if (opt === selected) className += " wrong";
            }

            return (
              <button
                key={opt}
                className={className}
                onClick={() => {
                  choose(opt);
                  setAnswers(prev => ({ ...prev, [q.id]: opt }));
                }}
                disabled={checked}
              >
                {text}
              </button>
            );
          })}
        </div>
      </div>

      <div className="quiz-footer">
        {!checked && (
          <button
            className="check-btn btn"
            onClick={checkAnswer}
            disabled={!selected}
          >
            Check Answer
          </button>
        )}

        {checked && (
          <button
            className="next-btn btn"
            onClick={index === questions.length - 1 ? finishQuiz : nextQuestion}
          >
            {index === questions.length - 1 ? "Finish" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
}
