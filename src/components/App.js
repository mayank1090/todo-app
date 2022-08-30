
import "./../styles/App.css";
import React, {useState} from 'react';



function App() {

  const [toDo, setToDo] = useState([]);


  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1; 
      let newEntry = {id: num, title: newTask, status: false}
      setToDo([...toDo, newEntry]);
      setNewTask('');
    }
  }

  
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  }

  
  const cancelUpdate = () => {
    setUpdateData('');
  }


  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

 
  const updateTask = () => {
    let filterRecords = [...toDo].filter( task=>task.id !== updateData.id);

    if (updateData.title){
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject)
    setUpdateData('')}

    else{
      alert("Input can't be blank . Please enter a valid TODO")
    }
  }

  
  return (
    <div id="main">
    <div className="container App">
      
      <br /><br />

      <h2>ToDo List</h2>

      <br /><br />
      

      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input 
                value={updateData && updateData.title} 
                onChange={ (e) => changeTask(e) } 
              />
            </div>
            <div className="col">
              <button 
                className="btnupdate"
                onClick={updateTask}
              >Update</button>
              <button 
                className="btncancel" 
                onClick={cancelUpdate}
              >Cancel</button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          <div className="row">
            <div className="col">
              <input id="task"
                value={newTask} 
                onChange={e => setNewTask(e.target.value)} 
              />
            </div>
            <div className="col-auto">
              <button id="btn"
                className="btnadd" 
                onClick={addTask}
              >Add Task</button>
            </div>
          </div>
          <br />
        </>
      )}

      
       {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map( (task, index) => {
        return(
          <React.Fragment key={task.id}>
            <div className="list">
          
            <div className="col taskBg">
              
              <div >
    
                <span className="taskNumber">{index + 1}</span> 
                <span className="taskText">{task.title}</span>
              </div>

              <div className="iconsWrap">
                
                
                {task.status ? null : (
                  <span >
                   <button onClick={ () => setUpdateData({ id: task.id, title: task.title, satus: task.status ? true : false }) }>Edit</button>
                  
                    
                  </span>
                )}

                <span >
                  < button onClick={() => deleteTask(task.id)}>Delete</button>
  
                </span>
              </div>

            </div>
            </div>
                     
        </React.Fragment>
        );
      })}
    </div>
    </div>

  );
}

export default App;
