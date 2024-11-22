const errorHandling = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

export default errorHandling;