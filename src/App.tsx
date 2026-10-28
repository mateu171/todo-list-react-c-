import { useEffect, useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import type { Task } from './types/Task'
import type { TaskPriority } from './types/TaskPriority'
import { PriorityOrder } from './types/PriorityOrder'
import TaskSortFilter from './components/TaskSortFilter'
import TaskSearch from './components/TaskSearch'

function App() {
   const [tasksArr, setTasks] = useState<Task[]>(() => {
      const savedTasks = localStorage.getItem("tasks")

      if (savedTasks) {
         try {
            return JSON.parse(savedTasks)
         } catch (e) {
            return []
         }
      }

      return [
         { id: crypto.randomUUID(), title: "Вивчити англ", completed: false, priority: "low" },
         { id: crypto.randomUUID(), title: "Вивчити математику", completed: true, priority: "medium" },
         { id: crypto.randomUUID(), title: "Вивчити англ", completed: false, priority: "high" },
      ]
   })
   const [filter, setFilter] = useState("all");
   const [searchQuery, setSearchQuery] = useState("")
   const [deadline, setDeadline] = useState("");
   const filteredTasks = tasksArr.filter(task => {
      const matchesFilter = filter === "completed"
         ? task.completed
         : filter === "active"
            ? !task.completed
            : true;
      const matchesSearch = task.title
         .toLowerCase()
         .includes(searchQuery.trim().toLowerCase());

      return matchesFilter && matchesSearch
   })
   const [sortOrder, setSortOrder] = useState<1 | -1>(-1);
   const sortedTasks = [...filteredTasks].sort((a, b) => sortOrder * (PriorityOrder[b.priority] - PriorityOrder[a.priority]))

   function toggleTask(id: string) {
      setTasks(prev => prev.map(task => task.id === id ?
         { ...task, completed: !task.completed }
         : task))
   }

   function updateTask(id: string, newTitle: string, newDeadline: string) {
      setTasks(prev => prev.map(task =>
         task.id === id
            ? { ...task, title: newTitle, deadline: newDeadline }
            : task
      ));
   }

   function addTask(newtitle: string, priority: TaskPriority, deadline: string) {
      const randomNumber = crypto.randomUUID()
      const newTask: Task = { id: randomNumber, title: newtitle, completed: false, priority: priority, deadline: deadline }
      setTasks(prev => [...prev, newTask])
      setDeadline("")
   }

   function deleteTask(id: string) {
      setTasks(prev => prev.filter(task => task.id !== id))
   }

   useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasksArr))
   }, [tasksArr])


   return (
      <>
         <header className="app-header">
            <div>
               <h1>Task Manager</h1>
               <p className="header-subtitle">Організуй свій день ✨</p>
            </div>
            <div className="header-icon">✓</div>
         </header>

         <section className="stats-grid">
            <div className="stat-card stat-total">
               <p>Всього завдань</p>
               <h2>{tasksArr.length}</h2>
            </div>

            <div className="stat-card stat-completed">
               <p>Виконано</p>
               <h2>{tasksArr.filter(task => task.completed).length}</h2>
            </div>

            <div className="stat-card stat-active">
               <p>Активних</p>
               <h2>{tasksArr.filter(task => !task.completed).length}</h2>
            </div>
         </section>

         <main className="main-layout">
            <section className="panel">
               <h2 className="panel-title">Мої завдання</h2>
               <TaskSearch onSearch={setSearchQuery}></TaskSearch>

               <TaskList
                  tasks={sortedTasks}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onUpdateTask={updateTask}
               />
            </section>

            <aside className="side-panel">
               <section className="panel form-panel">
                  <h2 className="panel-title">＋ Нова задача</h2>
                  <TaskForm onAddTask={addTask} deadline={deadline} onSetDeadline={setDeadline} />
               </section>

               <section className="panel filter-panel">
                  <h2 className="panel-title">
                     Фільтрувати та сортувати
                  </h2>
                  <TaskSortFilter
                     onSetFilter={setFilter}
                     onSetSort={setSortOrder}
                  />
               </section>
            </aside>
         </main>
      </>
   );

}

export default App
