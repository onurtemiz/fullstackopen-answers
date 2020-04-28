import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const exercises = [exercises1, exercises2, exercises3];
  const parts = [part1, part2, part3];
  return (
    <div>
      <Header title={course} />
      <Content exercises={exercises} parts={parts} />
      <Total exercises={exercises} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.title}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part exercise={props.exercises[0]} part={props.parts[0]} />
      <Part exercise={props.exercises[1]} part={props.parts[1]} />
      <Part exercise={props.exercises[2]} part={props.parts[2]} />
    </div>
  );
};

const Part = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  );
};

const Total = (props) => {
  let t = 0;
  for (let i = 0; i < props.exercises.length; i++) {
    t += props.exercises[i];
  }
  return <p>Number of exercises {t}</p>;
};

ReactDOM.render(<App />, document.getElementById("root"));
