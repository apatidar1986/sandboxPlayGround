import React, { useEffect, useState, useRef } from "react";

function SubRedits({ subReddit = "reactjs" }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`https://www.reddit.com/r/${subReddit}.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.children);
        return setList(data.data.children);
      });
  }, [subReddit]);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {list.map((item) => {
        return <li key={item.data.id}>{item.data.title}</li>;
      })}
    </div>
  );
}

const App = () => {
  const inputValue = useRef();
  const [subReddit, setSubReddit] = useState("reactjs");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue.current.value);
    setSubReddit(inputValue.current.value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          {" "}
          Search Topic :
          <input ref={inputValue} />
        </label>
      </form>
      <SubRedits subReddit={subReddit} />
    </div>
  );
};

export default App;
