import { FileReader } from "../common";

interface Point {
  x: number;
  y: number;
}

const toKey = (p: Point) => p.x+"_"+p.y

const up = (p: Point): Point => {return {x: p.x, y: p.y-1}}
const down = (p: Point): Point => {return {x: p.x, y: p.y+1}}
const east = (p: Point): Point => {return {x: p.x+1, y: p.y}}
const west = (p: Point): Point => {return {x: p.x-1, y: p.y}}

interface MoveMap {
  [key: string]: (p: Point) => Point
}

const moves: MoveMap = {
  '^': up,
  'v': down,
  '>': east,
  '<': west
}

class Solve3 extends FileReader {
  private data: string = '';

  private init = async () => {
    try {
      const rawData = await this.readData("input.data");
      this.data = rawData;
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  };

  run = async () => {
    await this.init();
    this.process();
  };

  private process = () => {
    let point = {x:0, y:0}
    const visited = {}
    visited[toKey(point)] = true    
    for (let move of this.data.split('')) {
      point = moves[move](point)
      const key = toKey(point)
      visited[key] = true
    }
    console.log(Object.values(visited).length)
  };
}

new Solve3().run();
