import { useState } from "react";
import "./App.css";
import Card from "./Card.js";
import Timecard from "./Timecard";

function App() {
  let [list, setList] = useState([{ name: "work", play: false }]);
  let [show, setShow] = useState(false);
  let [name, setName] = useState("");
  let [level, setLevel] = useState("Week");

  function addnew() {
    list.push({ name, play: false });
    setList([...list]);
    setName("");
    setShow(false);
  }
  function showinputvalue() {
    setShow(true);
  }

  function handlePlay(index) {
    let newlist = list.map((item) => ({ ...item, play: false }));
    newlist[index].play = !list[index].play;
    setList(newlist);
  }

  return (
    <div
      className="row"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100wv",
        flexWrap: "wrap",
      }}
    >
      <Timecard level={level} setLevel={setLevel} />

      {list.map((item, index) => (
        <Card
        level = {level}
          key={index}
          name={item.name}
          play={item.play}
          setPlay={() => handlePlay(index)}
        />
      ))}
      <div className="buttonbox">
        {show && (
          <div className="input">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
            />{" "}
          </div>
        )}
        <button
          className={show ? "save" : "new"}
          onClick={show ? addnew : showinputvalue}
        >
          {show ? "Save" : "+"}
        </button>
      </div>
    </div>
  );
}

export default App;
