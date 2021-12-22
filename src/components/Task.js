import React, { useState } from "react";
import checkImage from "../images/icon-check.svg";
// #5b import setDoc and doc from 'firebase/firestore
// #5b import db from "../utils/firebase"
import { setDoc,doc } from "firebase/firestore"
import db from "../utils/firebase";

function Task({ task, tasks, setTasks }) {

  const [mutableTask, setMutableTask] = useState(task);

  const checked = mutableTask.status ? "checked" : "";
  const checkIcon = mutableTask.status ? (
    <img src={checkImage} alt="completed" />
  ) : (
    ""
  );

  // #3 Create a function that when click the task status will be true on the frontend and backend(data)
  const markCompleted = () => {
    // For frontend CSS
    setMutableTask({ ...mutableTask, status: !mutableTask.status });
    
    // For backend data
    // const updatedTasks = tasks.map((item) =>
    //   item.id === task.id ? { ...item, status: !item.status } : item
    // );
    // setTasks(updatedTasks);

    // #6 for firebase data
    const docRef = doc(db, "tasks", task.id)
    const payload = {text: task.text, status: !task.status, id: task.id }
    setDoc(docRef, payload)
  };
  return (
    <div className="todo-item">
      <div className="check" onClick={markCompleted}>
        <div className={`check-mark ${checked}`}>{checkIcon}</div>
      </div>
      <div className={`todo-text ${checked}`}>{task.text}</div>
    </div>
  );
}

export default Task;
