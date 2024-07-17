import React, { useState } from 'react';

export default function TodoWeb() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, isEditing: false }]);
      setInputValue('');
    }
  };

  const handleEdit = (index) => {
    const newTodos = [...todos];
    newTodos[index].isEditing = !newTodos[index].isEditing;
    setTodos(newTodos);
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleSave = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    newTodos[index].isEditing = false;
    setTodos(newTodos);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div>
      <header>
        <input
          placeholder='Enter'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleAdd}>Add</button>
      </header>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: 'lightgray', 
            padding: '10px', 
            margin: '5px 0', 
            borderRadius: '5px',
            listStyle: 'none'
          }}>
            {todo.isEditing ? (
              <input
                type="text"
                defaultValue={todo.text}
                onBlur={(e) => handleSave(index, e.target.value)}
                style={{ marginRight: '10px', color: 'blue' }}
              />
            ) : (
              <span style={{ marginRight: '10px', color: 'blue' }}>{todo.text}</span>
            )}
            <button onClick={() => handleEdit(index)} style={{ marginRight: '5px' }}>
              <i className={todo.isEditing ? 'fas fa-save' : 'fas fa-edit'}></i>
            </button>
            <button onClick={() => handleDelete(index)}>
              <i className="fas fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
