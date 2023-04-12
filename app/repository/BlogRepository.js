module.exports = (Blog) => {

    const getAllBlog = () => {
        return Blog.find({});
    }

    const getBlog = (author) => {
        return Blog.find({ author });
    }

    const insertBlog = (data) => {
        let newBlog = new Blog(data);
        return newBlog.save();
    }

    const update = (id, data) => {
        return Blog.findByIdAndUpdate(id, data);
    }

    const remove = async (id) => {
        return Blog.findByIdAndDelete(id);
    }

    return {
        getAllBlog,
        remove,
        insertBlog,
        getBlog,
        update
    }

}