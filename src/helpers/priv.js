function makePrivs(arr) {
    let obj = {}
    let formula = i => Math.pow(2, i)
    let pointer = 0
    for (let item of arr) {
        obj[item] = formula(pointer++)
    }
    return obj
}

const globalPrivs = makePrivs([
    'read',
    'write',
    'exec'
])

function getPrivByCode(arr, flag) {
    let arrKeys = Object.keys(arr)
    for (let item of arrKeys)
        if (flag === arr[item])
            return item
}

/**
 * Bitwise check if permission flag is present
 * @param {*} pool sum of user's privileges
 * @param {*} flag specified privilege code to check for
 */
function checkPriv(pool, flag) {
    return (pool === -1) || ((flag & pool) === flag)
}

export { globalPrivs, getPrivByCode }
export default checkPriv
