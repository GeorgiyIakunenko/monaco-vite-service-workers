import { Editor, loader } from "@monaco-editor/react";
import { configureMonacoYaml } from "monaco-yaml";
// import workers
import YamlWorker from "./yaml.worker.js?worker";
import EditorWorker from "./editor.worker.js?worker";
import JsonWorker from "./json.worker.js?worker";

window.MonacoEnvironment = {
  getWorker(_: string, label: string): Promise<Worker> | Worker {
    switch (label) {
      case "json":
        return new JsonWorker();
      case "yaml":
        return new YamlWorker();
      //  return new Worker(new URL("monaco-yaml/yaml.worker", import.meta.url)); will not work
      default:
        return new EditorWorker();
    }
  },
};

loader.init().then((monaco) => configureMonacoYaml(monaco, {}));

export function MonacoEditor({ language }: { language: string }) {
  return (
    <Editor
      theme="vs-dark"
      height="50vh"
      language={language}
      defaultValue=""
    ></Editor>
  );
}
