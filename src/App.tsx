
import { Command } from '@tauri-apps/plugin-shell';
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  const [pythonResponse, setPythonResponse] = useState('');
  const callPython = async () => {
  console.log('callPython fired');
  try {
    const command = Command.create('python', ['sidecar.py']);
    console.log('command created');
    const output = await command.execute();
    console.log('stdout:', output.stdout);
    console.log('stderr:', output.stderr);
    setPythonResponse(output.stdout || output.stderr || 'empty output');
  } catch (error) {
    console.log('caught error:', error);
    setPythonResponse(`Error: ${error}`);
  }
};
  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <div>
          <button onClick={callPython}>Call Python</button>
          <p>{pythonResponse}</p>
        </div>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
