import React, { useState } from 'react';
import './App.css';

function App() {
  const [target, setTarget] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    setTarget(e.target.value);
  };

  const handleScan = (type) => {
    // For now, we'll just display the type of scan and target in the output
    setOutput(`Scan Type: ${type}\nTarget: ${target}`);
  };

  return (
    <div className="App">
      <h1>Nmap Web</h1>
      <input
        type="text"
        placeholder="Enter target IP address or hostname"
        value={target}
        onChange={handleInputChange}
      />
      <div className="buttons">
        <button onClick={() => handleScan('Ping Scan')}>Ping Scan</button>
        <button onClick={() => handleScan('Port Scan')}>Port Scan</button>
        <button onClick={() => handleScan('OS Detection and Service Version Detection')}>
          OS Detection and Service Version Detection
        </button>
        <button onClick={() => handleScan('Scan SMB Vuln')}>Scan SMB Vuln</button>
      </div>
      <div className="output">
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default App;