import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const title = "give feedback";
  const second_title = "statistics";
  const good_title = "good";
  const neutral_title = "neutral";
  const bad_title = "bad";
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const infoArr = [good, neutral, bad];
  const totalFeedback = good + bad + neutral;
  const setToGood = () => {
    setGood(good + 1);
  };

  const setToNeutral = () => {
    setNeutral(neutral + 1);
  };

  const setToBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Title title={title} />
      <Button handleClick={setToGood} text={good_title} />
      <Button handleClick={setToNeutral} text={neutral_title} />
      <Button handleClick={setToBad} text={bad_title} />
      <SecondTitle second_title={second_title} />
      <Statistics
        info={infoArr}
        good={good}
        bad={bad}
        totalFeedback={totalFeedback}
      />
    </div>
  );
};

const Positive = ({ good, all }) => {
  return (
    <div>
      <p>positive {(good / all) * 100} %</p>
    </div>
  );
};

const All = ({ all }) => {
  return (
    <div>
      <p>all {all}</p>
    </div>
  );
};

const Average = ({ all, good, bad }) => {
  return (
    <div>
      <p>average {(good - bad) / all}</p>
    </div>
  );
};

const Statistics = ({ info, totalFeedback, good, bad }) => {
  console.log(totalFeedback);
  return (
    <div>
      <p>good: {info[0]}</p>
      <p>neutral: {info[1]}</p>
      <p>bad: {info[2]}</p>

      <All all={totalFeedback} />
      <Average all={totalFeedback} good={good} bad={bad} />
      <Positive good={good} all={totalFeedback} />
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const SecondTitle = ({ second_title }) => {
  return (
    <div>
      <h2>{second_title}</h2>
    </div>
  );
};

const Title = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
