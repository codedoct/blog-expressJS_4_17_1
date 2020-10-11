const errorHandler = {}
errorHandler.BadRequest = (res, err) => {
    res.status(400).json({ status: "error", message: err })
}
errorHandler.Unauthorized = (res) => {
    res.status(401).json({ status: "error", message: "Unauthorized" })
}
errorHandler.NotFound = (res, err) => {
    res.status(404).json({ status: "error", message: err || "Not found" })
}
errorHandler.UnHandler = (res, err) => {
    if (err.name == "ValidationError") {
        let errorMessage
        if (err.details) {
            errorMessage = err.details[0].message
        } else {
            errorMessage = err.message
        }

        res.status(400).json({ status: "error", message: errorMessage })
    } else {
        let message = err.toString() || "Something technically wrong"
        res.status(500).json({ status: "error", message })
    }
}

module.exports = errorHandler
