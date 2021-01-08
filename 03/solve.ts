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
    const visited = {}
    this.process(visited);
    console.log(Object.values(visited).length)

    const visitedRobot = {}
    this.process(visitedRobot, true);
    this.process(visitedRobot, false);
    console.log(Object.values(visitedRobot).length)
  };

  private process = (visited: object, even?: boolean) => {
    let point = {x:0, y:0}
    visited[toKey(point)] = true    
    let cnt = 0
    for (let move of this.data.split('')) {
      cnt++
      if (even !== undefined && even && (cnt - 1) % 2 === 1) {
        continue
      }
      if (even !== undefined && !even && (cnt - 1) % 2 === 0) {
        continue
      }      
      point = moves[move](point)
      const key = toKey(point)
      visited[key] = true
    }    
  };
}

new Solve3().run();
