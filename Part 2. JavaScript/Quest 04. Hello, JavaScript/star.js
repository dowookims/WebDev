const getNumber = () => { 
  return parseInt(prompt("input numbers", "1"))
}

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

let d = getNumber()
getStar(d)