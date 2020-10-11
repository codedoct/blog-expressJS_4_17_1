const transformer = {}
transformer.showNews = (news) => {
    return newsTransform(news)
}

const newsTransform = (data) => {
    return {
        id: data._id,
        title: data.title || null,
        seo_url: data.seo_url || null,
        content: data.content || null,
        status: data.status || 0,

        created_at: data.created_at,
        updated_at: data.updated_at,
    }
}

module.exports = transformer
