import { FileReader } from "../common";

const WIDTH = 1000
const HEIGHT = 1000
enum INS {ON, OFF, TOGGLE}

class Solve6 extends FileReader {
  private data: string[] = [];
  private lamps: number[][] = []

  private init = async () => {    
    try {
      const rawData = await this.readData("input.data");
      this.data = rawData.split("\n");
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  };

  run = async () => {
    await this.init();
    this.lamps = Array.from({length: HEIGHT}, (v,k) => Array.from({length: WIDTH}, (v2, k2) => 0))
    this.process(false);

    this.lamps = Array.from({length: HEIGHT}, (v,k) => Array.from({length: WIDTH}, (v2, k2) => 0))
    this.process(true);
  };

  private process = (mode: boolean) => {
    for (let line of this.data) {
      let parts
      let ins
      if (line.startsWith('turn off ')) {
        parts = line.slice('turn off '.length).split(' through ')
        ins = INS.OFF
      } else if (line.startsWith('turn on ')) {
        parts = line.slice('turn on '.length).split(' through ')
        ins = INS.ON
      } else {
        parts = line.slice('toggle '.length).split(' through ')
        ins = INS.TOGGLE
      }
      const c1 = parts[0].split(',').map(v => +v)
      const c2 = parts[1].split(',').map(v => +v)
      for (let y=c1[1];y<=c2[1];y++) {
        for (let x=c1[0];x<=c2[0];x++) {
          const current = this.lamps[y][x]
          if (ins === INS.OFF) {
            this.lamps[y][x] = mode ? current - 1 : 0
            if (this.lamps[y][x] < 0) {
              this.lamps[y][x] = 0
            }
          } else if (ins === INS.ON) {
            this.lamps[y][x] = mode ? current + 1 : 1  
          } else {
            this.lamps[y][x] = mode ? current + 2 : (this.lamps[y][x] === 1 ? 0 : 1)
          }
        }
      }
    }
    console.log(this.lamps.reduce((a, line) => {
      return a + line.reduce((sum, l) => {        
        return sum + l
      }, 0)
    }, 0))
  };
}

new Solve6().run();
