import "bulmaswatch/superhero/bulmaswatch.min.css";
import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

const App = () => {
  const [input, setInput] = useState("");
  const ref = useRef<any>();
  const iframeRef = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if(!ref.current) return;

    iframeRef.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        "process.env.NODE_ENV": "'production'",
        global: "window"
      }
    });

    iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", event => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector("#root");
              root.innerHTML = "<div style='color: red;'><h4>Runtime Error:</h4>" + err + "</div>";
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <CodeEditor 
        initialValue="const a = 1;" 
        onChange={value => setInput(value)}
      />
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe ref={iframeRef} srcDoc={html} title="preview" sandbox="allow-scripts"></iframe>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));