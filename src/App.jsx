import './App.css'
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useState } from 'react';
import GramaticaChomsky from './gramatica-chosmky';

function App() {

  const gramatica = new GramaticaChomsky();

  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  
  const handleCodeChange = (code) => {
    const newCode = code;
    setCode(newCode);
    console.log(newCode)
  };

  return (
    <div className="content">
      <h3 className="errorsLog" >Verificador de sintaxis</h3>
      <CodeMirror
        value={code}
        height="400px"

        theme={vscodeDark}
        onChange={(editor) => {
          handleCodeChange(editor);
          console.log(code)
        }}
      />

      <div style={{ marginLeft: "20px" }}>
        {Object.keys(errors).length > 0 ? (
          <ul className="errorsLog">
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ) : (
          <p className="errorsLog">El código es válido.</p>
        )}
      </div>
    </div>
  )
}

export default App
