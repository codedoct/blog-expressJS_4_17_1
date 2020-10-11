const formater = {}

formater.generateSeoUrl = (data) => {
    return data.replace(/[^a-zA-Z0-9 ]/g, "").trim().replace(/\s+/g, '-').toLowerCase()
}

module.exports = formater
