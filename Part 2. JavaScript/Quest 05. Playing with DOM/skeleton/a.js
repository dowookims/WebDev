let a = "papapa medata";

const as = document.getElementsByName("div")
const us = document.getElementById("div")

console.log('as', as[0])
console.log('us', us)

const we = document.querySelector('div')

console.log('child nodes', we.childNodes)


// console.log(we.childNodes[1])
we.childNodes[1].setAttribute('class', "mamaa")
