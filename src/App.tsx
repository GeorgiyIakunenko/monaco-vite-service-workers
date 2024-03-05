import "./App.css";

import React, { useState } from "react";
import { MonacoEditor } from "./Editor/MonacoEditor.tsx";

const options = [
  {
    name: "json",
  },
  {
    name: "yaml",
  },
  {
    name: "other",
  },
];

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(options[0]);

  return (
    <>
      <MonacoEditor language={selectedLanguage.name}></MonacoEditor>
      <div>
        {options.map((item) => (
          <React.Fragment key={item.name}>
            <input
              defaultChecked={selectedLanguage.name == item.name}
              type="radio"
              id={item.name}
              name="options"
            />
            <label
              onClick={() => {
                setSelectedLanguage(item);
              }}
              htmlFor={item.name}
              className="radio-label"
            >
              {item.name}
            </label>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default App;
