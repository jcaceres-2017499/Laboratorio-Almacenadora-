import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState({ name: '', description: '', startDate: '', endDate: '', addedBy: '' });
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleChange = e => {
    const { name, value } = e.target;
    setInputTask(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingIndex === -1) {
      setTasks([...tasks, inputTask]);
    } else {
      const newTasks = [...tasks];
      newTasks[editingIndex] = inputTask;
      setTasks(newTasks);
      setEditingIndex(-1);
    }
    setInputTask({ name: '', description: '', startDate: '', endDate: '', addedBy: '' });
  };

  const handleEdit = (index, task) => {
    setEditingIndex(index);
    setInputTask(task);
  };

  const handleDelete = index => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  const handleCheckbox = index => {
    setTasks(tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div>
      <h2>Agrega una tarea</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tarea de:
          <input type="text" name="name" value={inputTask.name} onChange={handleChange} />
        </label>
        <label>
          Descripción de la tarea:
          <input type="text" name="description" value={inputTask.description} onChange={handleChange} />
        </label>
        <label>
          Fecha de inicio del trabajo:
          <input type="date" name="startDate" value={inputTask.startDate} onChange={handleChange} />
        </label>
        <label>
          Fecha de cierre del trabajo:
          <input type="date" name="endDate" value={inputTask.endDate} onChange={handleChange} />
        </label>
        <label>
          Creador de la tarea realizada:
          <input type="text" name="addedBy" value={inputTask.addedBy} onChange={handleChange} />
        </label>
        <button type="submit">{editingIndex === -1 ? 'Agregar' : 'Guardar'}</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <div>
              <input type="checkbox" checked={task.completed} onChange={() => handleCheckbox(index)} />
              <span style={task.completed ? { textDecoration: 'line-through' } : {}}>{task.name}</span>
            </div>
            <div>
              <p>Descripción de la tarea: {task.description}</p>
              <p>Fecha de inicio del trabajo: {task.startDate}</p>
              <p>Fecha de cierre del trabajo: {task.endDate}</p>
              <p>Creador de la tarea realizada: {task.addedBy}</p>
            </div>
            <div>
              <button onClick={() => handleDelete(index)}>Eliminar</button>
              <button onClick={() => handleEdit(index, task)}>Editar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
