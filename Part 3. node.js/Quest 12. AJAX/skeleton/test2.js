const fn = (d) => {
    Object.keys(d).forEach(key => {
        console.log(d[key]);
    })
}

fn({a:1, b:2})