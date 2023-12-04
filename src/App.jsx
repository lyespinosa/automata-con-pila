import React, { useState } from "react";
import "./index.css";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import validateAutomaton from "./gramatica-chosmky";

const CodeValidator = () => {
  const [code, setCode] = useState("");
  const [stacks, setStacks] = useState([]);
  const [isValid, setIsValid] = useState(undefined);

  const submitInputString = () => {
    const result = validateAutomaton(code);
    setStacks(result.stack)
    setIsValid(result.isValid);
  }

  return (
    <div className="content">
      <h3 className="errorsLog" >Verificador de sintaxis</h3>
      <CodeMirror
        value={code}
        height="300px"

        theme={vscodeDark}
        onChange={(editor,) => {
          setCode(editor);
        }}
      />

      <button onClick={submitInputString} className="buttonSubmit">Aceptar</button>

      <h2 className="pilaTitle">Estados de la pila ↓ {
        isValid === undefined ? null :  isValid ? <span className="message correct">Cadena válida</span> : <span className="message failed">Error en sintaxis</span>
      }</h2>
      <div className="stacksContainer">
        {stacks.map((stack, index) => (
          <div className="stack" key={index}>
            {/* Renderizar cada elemento del array en un div */}
            {stack.map((element, elementIndex) => (
              <div className="element" key={elementIndex}>{element}</div>
            ))}
          </div>
        ))}
      </div>
      

    </div>
  );
};

export default CodeValidator;