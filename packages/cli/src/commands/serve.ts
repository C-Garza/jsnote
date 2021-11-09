import path from "path";
import { Command } from "commander";
import { serve } from "@jsnote-cga/local-api";
import { defaultCells } from "../defaultCells";

const isProduction = process.env.NODE_ENV === "production";


export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "Port to run server on", "4005")
  .action(async (filename = "notebook.js", options: {port: string}) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir, !isProduction, defaultCells);
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
      );
    } catch(err: any) {
      if(err.code === "EADDRINUSE") {
        console.log("ERR: Port is in use. Try running on a different port.");
      }
      else {
        console.log("Error: ", err.message);
      }
      process.exit(1);
    }
  });