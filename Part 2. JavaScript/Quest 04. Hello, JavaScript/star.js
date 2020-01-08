const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const getStar = (n) => {
  const blank = " "
  const star = "*"

  for (let i=1; i < n+1; i++){
    let txt = ""
    
    for (let k=0; k<n-i; k++){
      txt += blank
    }
    for (let j=0; j<2*i -1; j++){
      txt += star 
    }
    console.log(txt)
  }
}

const numValidator = (txt) => {
  const d = parseInt(txt)
  if (typeof(d) === "number"){
    if (d >= 1){
      getStar(d)
    } else if(isNaN(d)) {
      console.log("숫자만 입력하세요")
    } else {
      console.log('1이상의 수를 입력해 주세요.')
    }
  } 
}

const getNumber = () => {
  readline.question("input numbers \n", num => {
    numValidator(num)
    readline.close()
  })
}


getNumber()





