import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [target, setTarget] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setTarget(e.target.value);
    };

    const handleClick = (choice) => {
        setLoading(true);
        setOutput('');
        axios.get(`http://127.0.0.1:8000/nmapapp/run-command/`, {
            params: {
                target: target,
                choice: choice
            }
        })
        .then(response => {
            setLoading(false);
            setOutput(response.data.output);
        })
        .catch(error => {
            setLoading(false);
            console.error('There was an error!', error);
            setOutput('There was an error running the scan.');
        });
    };

    return (
        <div className="App">
            <h1>Network Web Mapper</h1>
            <input
                type="text"
                value={target}
                onChange={handleChange}
                placeholder="Enter target IP address or hostname"
            />
            <div className="buttons">
                <button onClick={() => handleClick('Ping Scan')}>Ping Scan</button>
                <button onClick={() => handleClick('Port Scan')}>Port Scan</button>
                <button onClick={() => handleClick('OS Detection and Service Version Detection')}>OS Detection and Service Version Detection</button>
                <button onClick={() => handleClick('Scan SMB Vuln')}>Scan SMB Vuln</button>
                <button onClick={() => handleClick('DNS Lookup')}>DNS Lookup</button>
                <button onClick={() => handleClick('Reverse Lookup')}>Reverse Lookup</button>
            </div>
            <div className="output">
                <h2>Output:</h2>
                {loading ? (
                    <div className="loader"></div>
                ) : (
                    <pre>{output}</pre>
                )}
            </div>
        </div>
    );
}

export default App;