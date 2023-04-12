module.exports = (BlogRepository) => {

    const getAllBlog = () => {
        return BlogRepository.getAllBlog()
        .select([
            "-__v"
        ]);
    }

    const getBlogByAuthor = (author) => {
        const blog = BlogRepository.getAllBlog().where("author", author);
        return blog.length > 0 ? blog : "Author not found";
    }

    const createBlog = (blogData) => {
        let current_ts = Date.now();
        blogData = {
            ...blogData,
            created_ts: current_ts,
            updated_ts: current_ts
        }
        return BlogRepository.insertBlog(blogData);
    }

    const updateBlog = (id, data) => {
        data = { ...data, updated_ts: Date.now() }
        return BlogRepository.update(id, data);
    }

    const deleteBlog = (id) => {
        return BlogRepository.remove(id,);
    }

    return {
        getAllBlog,
        getBlogByAuthor,
        createBlog,
        updateBlog,
        deleteBlog
    }

}