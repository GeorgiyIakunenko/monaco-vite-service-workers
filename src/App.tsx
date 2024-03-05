import "./App.css";
import { Editor, loader } from "@monaco-editor/react";
import YamlWorker from "./yaml.worker.js?worker";
import EditorWorker from "./editor.worker.js?worker";
import { configureMonacoYaml } from "monaco-yaml";
import { useRef } from "react";

window.MonacoEnvironment = {
  getWorker(_: string, label: string): Promise<Worker> | Worker {
    switch (label) {
      case "editorWorkerService":
        //    return new Worker(
        //      new URL("monaco-editor/esm/vs/editor/editor.worker", import.meta.url)
        // );
        return new EditorWorker();
      case "yaml":
        return new YamlWorker();
      //return new Worker(new URL("monaco-yaml/yaml.worker", import.meta.url));
      default:
        return new YamlWorker();
      //return new Worker(new URL("monaco-yaml/yaml.worker", import.meta.url));
    }
  },
};

loader.init().then((monaco) => configureMonacoYaml(monaco, {}));

function App() {
  const monacoRef = useRef(null);

  function handleEditorWillMount(monaco) {
    // here is the monaco instance
    // do something before editor is mounted
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  function handleEditorDidMount(editor, monaco) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = monaco;
  }

  return (
    <>
      Editor
      <Editor
        theme="light"
        height="90vh"
        defaultLanguage="yaml"
        defaultValue="console.log()"
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
      ></Editor>
    </>
  );
}

export default App;
