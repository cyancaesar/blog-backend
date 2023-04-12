module.exports = (BlogService) => {
    import("express");

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_index = async (req, res) => {
        const blogs = await BlogService.getAllBlog();

        res.json({ message: blogs });
    }

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_create = async (req, res) => {
        const result = await BlogService.createBlog(req.body);
        console.log(result);

        res.status(201).json({ message: "check terminal" });
    }

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_get_by_author = async (req, res) => {
        const { author } = req.params;
        let blog = await BlogService.getBlogByAuthor(author);

        return res.json({ message: blog });
    }

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_update = async (req, res) => {
        const { id } = req.params;
        const result = await BlogService.updateBlog(id, req.body);
        console.log(result);

        res.json({ message: "updated" });
    }

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_delete = async (req, res) => {
        const { id } = req.params;

        const result = await BlogService.deleteBlog(id);
        if (!result) return res.json({ message: "Blog doesn't exist" })

        return res.json({ message: "deleted" });

    }

    return {
        blog_index,
        blog_create,
        blog_get_by_author,
        blog_update,
        blog_delete
    }
}