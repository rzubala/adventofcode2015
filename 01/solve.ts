import { FileReader } from "../common";

class Solve1 extends FileReader {
  private data: string[] = [];

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
    this.process();
  };

  private process = () => {    
    const up = (this.data[0].match(/\(/g) || []).length;
    const down = (this.data[0].match(/\)/g) || []).length;
    console.log(up-down)
    let floor = 0
    let cnt = 0
    for (let s of this.data[0]) {
      if (s === '(') {
        floor++
      } else {
        floor--
      }
      cnt++
      if (floor === -1) {
        console.log(cnt)
        break
      }
    }
  };
}

new Solve1().run();
