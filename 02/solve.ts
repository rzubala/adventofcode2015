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
    const result = this.data.reduce((total, line) => {
      const parts = line.split('x').map(e => +e).sort((a,b) => a-b)
      const area = 2*parts[0]*parts[1] + 2*parts[0]*parts[2] + 2*parts[1]*parts[2] + parts[0]*parts[1]
      total['area'] = area + (total['area'] || 0)
      const ribbon = 2*parts[0] + 2*parts[1] + parts[0] * parts[1] * parts[2]
      total['ribbon'] = ribbon + (total['ribbon'] || 0)
      return total
    }, {})
    console.log(result)
  };
}

new Solve2().run();
