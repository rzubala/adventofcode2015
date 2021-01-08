import { FileReader } from "../common";

/*
It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).

*/

const vowels = 'aeiou'.split('')
const forbidden = ['ab', 'cd', 'pq', 'xy']

class Solve5 extends FileReader {
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
    this.process1();
    this.process2();
  };

  private process1 = () => {
    let nice = 0
    for (let line of this.data) {
      let vcnt = 0
      let last = undefined
      let hasVowels = false
      let hasForbidden = false
      let hasDuplet = false
      for (let c of line.split('')) {
        if (last !== undefined) {
          const tmp = last+c
          if (forbidden.includes(tmp)) {
            hasForbidden = true
            break
          }
          if (c === last) {
            hasDuplet = true
          }
        }
        if (vowels.includes(c)) {
          if (++vcnt >= 3) {
            hasVowels = true
          }
        }
        last = c
      }
      if (!hasForbidden && hasVowels && hasDuplet) {
        nice++
      }
    }
    console.log(nice)
  };

  private process2 = () => {
   let nice = 0
   for (let line of this.data) {
    let last2 = undefined
    let last = undefined
    let hasRepeat = false
    let hasPairs = false
    for (let c of line.split('')) {
      if (last !== undefined) {
        const tmp = last+c
        const index = line.indexOf(tmp)
        const index2 = line.lastIndexOf(tmp)
        if (index2 > index + 1) {
          hasPairs = true
        }
      }
      if (c === last2) {
        hasRepeat = true
      }
      if (hasRepeat && hasPairs) {
        nice++
        break
      }
      
      last2 = last
      last = c      
    }    
   }
   console.log(nice)
  }
}

new Solve5().run();
