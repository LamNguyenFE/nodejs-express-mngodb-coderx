function add(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string')
        throw new Error('Wrong type')
    return a + b
}


//neu loi thi cac dong tiep theo khong chay

//neu muon chay tiep mac du ham chay sai

try {
    let total = add('a', 1)
} catch (error) {
    //result : Wrong type
    console.error(error)
}
//ReferenceError: total is not defined
console.log('total', total)
// add('a','b')

//express middleware stack


