import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
// #3a Import onSnapshot,collection from 'firebase/firestore
// #3b import db from './utils/firebase
import { onSnapshot,collection } from 'firebase/firestore';
import db from './utils/firebase';

const data = [

];

function App() {
  const [tasks, setTasks] = useState(data);


  const [filterStatus, setFilterStatus] = useState("all");


  const [filteredTasks, setFilteredTasks] = useState(tasks);
 
  // useEffect(() => {
  //   const handleFilter = () => {
  //     if (filterStatus === "active") {
  //       return setFilteredTasks(tasks.filter((task) => task.status === false));
  //     } else if (filterStatus === "completed") {
  //       return setFilteredTasks(tasks.filter((task) => task.status === true));
  //     } else {
  //       return setFilteredTasks(tasks);
  //     }
  //   };
  //   handleFilter();
  // }, [tasks, filterStatus]);

  // #4
  useEffect(()=>{
    const unsub = onSnapshot(collection(db,"tasks"),(snapshot)=>{
      let todos = snapshot.docs.map(doc=> ({...doc.data(), id: doc.id}))
      const handleFilter = () => {
        if(filterStatus === "active") {
          console.log("FILTER STATUS IS ACTIVE")
          return setFilteredTasks(todos.filter((task)=>task.status === false))
        }
        else if (filterStatus === "completed") {
          console.log("STATUS IS COMPLETED")
          // If the filter status is completed I should setFilteredTasks to only the todos that have the status of true
          return setFilteredTasks(todos.filter((task)=> task.status === true))
        }
        else {
          console.log("IS ALL")
          // If the status is all setFilteredTasks to todos
          return setFilteredTasks(todos)
        }
      }
      handleFilter()
    }) 
    return unsub
  },[tasks,filterStatus])


  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <div className="title">TODO</div>
          <div className="theme">
            <img src="./images/icon-sun.svg" alt="theme" />
          </div>
        </div>

        <TaskInput tasks={tasks} setTasks={setTasks} />


        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          setFilterStatus={setFilterStatus}
          filterStatus={filterStatus}
          filteredTasks={filteredTasks}
          setFilteredTasks={setFilteredTasks}
        />
      </div>
    </div>
  );
}

export default App;
