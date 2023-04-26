import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [teste, setTeste] = useState("");

  useEffect(() => {
    if (teste === "") {
      async function fetchData() {
        try {
          const response = await fetch(
            "http://localhost.localdomain:5000/posts"
          );
          const responseContent = await response.json();
          console.log(responseContent);
          setTeste(responseContent);
        } catch (err) {
          console.log(err);
        }
      }
      fetchData();
    }
  }, [teste]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
