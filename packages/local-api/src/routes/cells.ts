import express, {Request, Response} from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code"
};

export const createCellsRouter = (filename: string, dir: string, defaultCells: Cell[]) => {

  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req: Request, res: Response) => {
    try {
      const result = await fs.readFile(fullPath, {encoding: "utf-8"});

      res.send(JSON.parse(result));
    } catch(err: any) {
      if(err.code === "ENOENT") {
        await fs.writeFile(fullPath, JSON.stringify(defaultCells), "utf-8");
        const result = await fs.readFile(fullPath, {encoding: "utf-8"});
        res.send(JSON.parse(result));
      }
      else {
        throw err;
      }
    }
  });

  router.post("/cells", async (req: Request, res: Response) => {
    const {cells}: {cells: Cell[]} = req.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({status: "OK"});
  });

  return router;

};