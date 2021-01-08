import MD5 from './md5.js'

class Solve4 {  
  public run = (zeros: number) => {
    const key = 'ckczppom'
    let num = 0;
    while(true) {
      if (MD5(key + num).slice(0,zeros) === '0'.repeat(zeros)) {
        console.log(num)
        break;
      }
      num++
    }
  };
}

new Solve4().run(5);
new Solve4().run(6);
