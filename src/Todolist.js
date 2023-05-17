import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/fontawesome-free-solid";

const Todolist = () => {
  const [task, setTask] = useState([]);
  const [value, setValue] = useState("");
  const [marked, setMarked] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("tasks"));
    const markedItems = JSON.parse(localStorage.getItem("marked"));
    if (items) {
      setTask(items);
    }
    if (markedItems) {
      setMarked(markedItems);
    } 
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    const newTask = [{ text: value }, ...task];
    setTask(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
    setValue("");
  };

  const RemoveTask = (text) => {
    const newTask = task.filter((e) => {
      return e.text !== text;
    });
    setTask(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
  };

  const RemoveCompletedTask = (index) => {
    marked.splice(index, 1);
    setMarked([...marked]);
    localStorage.setItem("marked", JSON.stringify(marked));
  };

  const markTask = (index) => {
    let newTask = [...marked, task[index]];
    setMarked(newTask);
    task.splice(index, 1);
    setTask([...task]);
    localStorage.setItem("tasks", JSON.stringify(task));
    localStorage.setItem("marked", JSON.stringify(newTask));
  };

  return (
    <div className="todolist">
      <div className="header">
        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Enter Task Here"
            value={value}
            className="inputfield"
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {task.length > 0 && (
          <div className="taskList">
            <h4>Ongoing Tasks</h4>
            {task.map((t, i) => (
              <div key={i} className="task">
                <p
                  style={{
                    margin: "0",
                  }}
                >
                  {t.text}
                </p>
                <div className="controls">
                  <input
                    type="checkbox"
                    checked={false}
                    className="checked"
                    onChange={() => markTask(i)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => RemoveTask(t.text)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {marked.length > 0 && (
          <div className="marked">
            <h4>Completed Tasks</h4>
            {marked.map((t, i) => (
              <div key={i} className="task">
                <p
                  style={{
                    margin: "0",
                  }}
                >
                  {t.text}
                </p>
                <div className="controls">
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => RemoveCompletedTask(i)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todolist;
