import React from "react";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import { useEffect, useState } from "react";
// #3a Import onSnapshot,collection from 'firebase/firestore
// #3b import db from './utils/firebase
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc } from "firebase/firestore";

const data = [];

const Dashboard = () => {
  const [tasks, setTasks] = useState(data);

  const [filterStatus, setFilterStatus] = useState("all");

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const [currentUser, setCurrentUser] = useState({});

  const logout = async () => {
    try {
      await signOut(auth).then(() => {
        console.log("user signed out");
        window.location = "/";
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
  //     let todos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     const handleFilter = () => {
  //       if (filterStatus === "active") {
  //         console.log("FILTER STATUS IS ACTIVE");
  //         return setFilteredTasks(
  //           todos.filter((task) => task.status === false)
  //         );
  //       } else if (filterStatus === "completed") {
  //         console.log("STATUS IS COMPLETED");
  //         // If the filter status is completed I should setFilteredTasks to only the todos that have the status of true
  //         return setFilteredTasks(todos.filter((task) => task.status === true));
  //       } else {
  //         console.log("IS ALL");
  //         // If the status is all setFilteredTasks to todos
  //         return setFilteredTasks(todos);
  //       }
  //     };
  //     handleFilter();
  //   });
  //   return unsub;
  // }, [tasks, filterStatus]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.uid);
      } else {
        console.log("No user signed in");
      }
    });
    onSnapshot(doc(db, "users", `${currentUser}`), (snapshot) => {
      let todos = snapshot
        .data()
        .tasks.map((task, id) => ({ ...task, id: id }));
      const handleFilter = () => {
        if (filterStatus === "active") {
          return setFilteredTasks(
            todos.filter((task) => task.status === false)
          );
        } else if (filterStatus === "completed") {
          // If the filter status is completed I should setFilteredTasks to only the todos that have the status of true
          return setFilteredTasks(todos.filter((task) => task.status === true));
        } else {
          // If the status is all setFilteredTasks to todos
          return setFilteredTasks(todos);
        }
      };
      handleFilter();
    });
    return unsub();
  }, [currentUser, tasks, filterStatus]);

  return (
    <div className="Dashboard">
      <div className="container">
        <div className="header">
          <button type="button" onClick={logout}>
            Logout
          </button>
          <div className="title">TODO</div>
          <div className="theme">
            <img src="./images/icon-sun.svg" alt="theme" />
          </div>
        </div>

        <TaskInput
          tasks={tasks}
          setTasks={setTasks}
          currentUser={currentUser}
          filteredTasks={filteredTasks}
        />

        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          setFilterStatus={setFilterStatus}
          filterStatus={filterStatus}
          filteredTasks={filteredTasks}
          setFilteredTasks={setFilteredTasks}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default Dashboard;
