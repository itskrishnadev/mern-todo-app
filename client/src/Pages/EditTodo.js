import React, { Component,useEffect ,useState} from 'react';
import axios from 'axios';
import {useParams,useNavigate  } from "react-router-dom"


function EditTodo() {
    const [state, setState] = useState({
        todo_description: '',
        todo_responsible: '',
        todo_priority: '',
        todo_completed: false
    })
    const { id } = useParams();
    const history = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:4000/todos/' + id)
        .then(response => {
            setState(ev => ({
                ...ev,
                todo_description: response.data.todo_description,
                todo_responsible: response.data.todo_responsible,
                todo_priority: response.data.todo_priority,
                todo_completed: response.data.todo_completed
              }))
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [])

    const  onChangeTodoDescription=(e)=> {
        setState(ev=>({
            ...ev,
            todo_description: e.target.value   
        }))
    }

  const  onChangeTodoResponsible =(e)=> {
        setState(ev=>({
            ...ev,
            todo_responsible: e.target.value
        }))
  
    }

const onChangeTodoPriority=(e)=> {
        setState(ev=>({
            ...ev,
            todo_priority: e.target.value
        }))
      
    }

  const  onChangeTodoCompleted =(e)=> {
        setState(ev=>({
            ...ev,
            todo_completed: !state.todo_completed
        }))

    }

   const onSubmit =(e)=> {
        e.preventDefault();
        const obj = {
            todo_description: state.todo_description,
            todo_responsible: state.todo_responsible,
            todo_priority: state.todo_priority,
            todo_completed: state.todo_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/todos/update/'+id, obj)
            .then(res => console.log(res.data));
        
            history("/") 
    }
    
  return (
    <div>
    <h3 align="center">Update Todo</h3>
    <form onSubmit={onSubmit}>
        <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                    className="form-control"
                    value={state.todo_description}
                    onChange={onChangeTodoDescription}
                    />
        </div>
        <div className="form-group">
            <label>Responsible: </label>
            <input 
                    type="text" 
                    className="form-control"
                    value={state.todo_responsible}
                    onChange={onChangeTodoResponsible}
                    />
        </div>
        <div className="form-group">
            <div className="form-check form-check-inline">
                <input  className="form-check-input" 
                        type="radio" 
                        name="priorityOptions" 
                        id="priorityLow" 
                        value="Low"
                        checked={state.todo_priority==='Low'} 
                        onChange={onChangeTodoPriority}
                        />
                <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
                <input  className="form-check-input" 
                        type="radio" 
                        name="priorityOptions" 
                        id="priorityMedium" 
                        value="Medium" 
                        checked={state.todo_priority==='Medium'} 
                        onChange={onChangeTodoPriority}
                        />
                <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
                <input  className="form-check-input" 
                        type="radio" 
                        name="priorityOptions" 
                        id="priorityHigh" 
                        value="High" 
                        checked={state.todo_priority==='High'} 
                        onChange={onChangeTodoPriority}
                        />
                <label className="form-check-label">High</label>
            </div>
        </div>
        <div className="form-check">
            <input  className="form-check-input"
                    id="completedCheckbox"
                    type="checkbox"
                    name="completedCheckbox"
                    onChange={onChangeTodoCompleted}
                    checked={state.todo_completed}
                    value={state.todo_completed}
                    />
            <label className="form-check-label" htmlFor="completedCheckbox">
                Completed
            </label>                        
        </div>

        <br />

        <div className="form-group">
            <input type="submit" value="Update Todo" className="btn btn-primary" />
        </div>
    </form>
</div>
  )
}

export default EditTodo