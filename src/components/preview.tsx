import {useEffect, useRef} from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  err: string;
};

const html = `
<html>
  <head>
    <style>html { background-color: white; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err) => {
        const root = document.querySelector("#root");
        root.innerHTML = "<div style='color: red;'><h4>Runtime Error:</h4>" + err + "</div>";
        console.error(err);
      };
      window.addEventListener("error", event => {
        if(!event) return;
        event.preventDefault();
        handleError(event.error);
      });
      window.addEventListener("message", event => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview = ({code, err}: PreviewProps): JSX.Element => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
  }, [code]);

  const loadHandler = () => {
    iframeRef.current.contentWindow.postMessage(code, "*");
  };

  return (
    <div className="preview-wrapper">
      <iframe 
        ref={iframeRef} 
        srcDoc={html} 
        title="preview" 
        sandbox="allow-scripts"
        onLoad={loadHandler}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;