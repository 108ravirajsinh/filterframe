
import { Command } from '@tauri-apps/plugin-shell';
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [pythonResponse, setPythonResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const callPython = async () => {
    setLoading(true);
    setPythonResponse('');
    try {
      const imagePath = 'C:\\Users\\108ra\\Projects\\filterframe\\src-tauri\\test-images\\fullycloth.jpg';
      const command = Command.create('python', ['sidecar.py', imagePath]);
      const output = await command.execute();
      setPythonResponse(output.stdout || output.stderr || 'empty output');
    } catch (error) {
      setPythonResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>FilterFrame IPC Test</h1>
      <button onClick={callPython} disabled={loading}>
        {loading ? 'Analyzing...' : 'Test NudeNet'}
      </button>
      {pythonResponse && (
        <pre style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
          {pythonResponse}
        </pre>
      )}
    </div>
  );
}

export default App;