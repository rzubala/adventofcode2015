import { FileReader } from "../common";

class Solve2 extends FileReader {
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
    const area = this.data.reduce((area, line) => {
      const parts = line.split('x').map(e => +e).sort((a,b) => a-b)
      area += 2*parts[0]*parts[1] + 2*parts[0]*parts[2] + 2*parts[1]*parts[2] + parts[0]*parts[1]
      return area
    }, 0)
    console.log(area)
  };
}

new Solve2().run();
