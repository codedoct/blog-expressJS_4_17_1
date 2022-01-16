const transformer = {}
transformer.showUser = (user) => {
    return userTransform(user)
}

const userTransform = (data) => {
    return {
        id: data._id,
        profile_url: data.profile_url || null,
        name: data.name || null,
        email: data.email || null,
        address: data.address || null,
        gender: data.gender || null,

        created_at: data.created_at,
        updated_at: data.updated_at,
    }
}

module.exports = transformer
