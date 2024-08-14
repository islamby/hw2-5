import React, { useState, useEffect } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    setEntries(savedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue.trim()) {
      setEntries([...entries, { name: inputValue, date: new Date().toLocaleDateString() }]);
      setInputValue('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <div className="App">
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        onKeyDown={handleKeyDown} 
        placeholder="Введите имя"
      />
      <button onClick={handleButtonClick}>Добавить</button>
      <div>
        {entries.length === 0 ? (
          <p>Нет записей</p>
        ) : (
          entries.map((entry, index) => (
            <p key={index}>{entry.name}</p>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
