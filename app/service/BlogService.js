module.exports = (BlogRepository) => {

    const getAllBlog = (query) => {
        const page = query.p < 0 ? 0 : query.p;
        return BlogRepository.getAll({ page });
    };

    const getAuthorBlog = (author) => {
        return BlogRepository.getByAuthor(author);
    };

    const createBlog = (blogData) => {
        let current_ts = Date.now();
        blogData = {
            ...blogData,
            created_ts: current_ts,
            updated_ts: current_ts
        };
        return BlogRepository.create(blogData);
    };

    const updateBlog = (id, data) => {
        data = { ...data, updated_ts: Date.now() };
        return BlogRepository.update(id, data);
    };

    const deleteBlog = (id) => {
        return BlogRepository.deleteById(id);
    };

    return {
        getAllBlog,
        getAuthorBlog,
        createBlog,
        updateBlog,
        deleteBlog
    };

};