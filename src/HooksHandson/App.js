import React, { useEffect, useState, useRef } from "react";

const useFetch = (url, initailState) => {
  const [data, setData] = useState(initailState);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return setData(data);
        // console.log(data.data.children);
        // return setList(data.data.children);
      })
      .catch((error) => {
        console.log("myError", error);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [url]);
  return {
    data,
    error,
    isLoading
  };
};
function SubRedits({ subReddit = "reactjs" }) {
  // const [list, setList] = useState([]);
  const { data, error, isLoading } = useFetch(
    `https://www.reddit.com/r/${subReddit}.json`,
    []
  );
  const list = data?.data?.children ?? [];
  // useEffect(() => {
  //   fetch(`https://www.reddit.com/r/${subReddit}.json`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.data.children);
  //       return setList(data.data.children);
  //     });
  // }, [subReddit]);
  console.log("isLoading", isLoading);
  return (
    <div className="App">
      {error && <div>{error.message}</div>}
      {isLoading ? (
        <div> loading ....</div>
      ) : (
        <div>
          <h1>{`List of the Results about ${subReddit}`}</h1>
          {list.map((item) => {
            return <li key={item.data.id}>{item.data.title}</li>;
          })}
        </div>
      )}
    </div>
  );
}

const MyUnMountTest = ({ subReddit }) => {
  console.log("subReddit >>>", subReddit);
  const [isSubRedditEmpty, SetIsSubRedditEmpty] = useState(Boolean(subReddit));

  useEffect(() => {
    SetIsSubRedditEmpty(Boolean(subReddit));
    return () => {
      // alert("unmount");
      SetIsSubRedditEmpty(false);
    };
  }, [subReddit]);
  return <div>MyUnMountTest</div>;
};

const App = () => {
  const inputValue = useRef();
  // const [isShowUnMount, setIsShowUnMount] = useState(false);
  const [subReddit, setSubReddit] = useState("reactjs");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue.current.value);
    setSubReddit(inputValue.current.value);
  };

  return (
    <div>
      {subReddit && <MyUnMountTest subReddit={subReddit} />}
      {/* <button onClick={onUnmount}>unmount MyUnMountTest </button> */}
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
