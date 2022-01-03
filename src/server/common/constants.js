const rate = 0.02;

const calculusValue = (val) => {
    return val * rate;
}

const serviceResult = {
    msg: "",
    result: true,
    data: []
}

const parseServiceResult = data => {
    return { ...serviceResult, data: data }
}
module.exports = {
    calculusValue,
    serviceResult,
    parseServiceResult
};