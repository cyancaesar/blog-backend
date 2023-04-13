module.exports = (BlogService) => {
    import("express");

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_index = async (req, res) => {
        try {
            const blog = await BlogService.getAllBlog(req.query);
            res.json({ ...blog });
        } catch (err) {
            res.status(400).json(err);
        }
    };

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_create = async (req, res) => {
        try {
            const result = await BlogService.createBlog(req.body);
            return res.status(201).json({ ...result });
        }
        catch (err) {
            return res.status(400).json(err);
        }
    };

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_get_by_author = async (req, res) => {
        const { author } = req.params;
        try {
            let blog = await BlogService.getAuthorBlog(author);
            return res.json({ ...blog });
        } catch (err) {
            res.status(400).json(err);
        }
    };

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_update = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await BlogService.updateBlog(id, req.body);
            res.json({ message: result });
        } catch (err) {
            res.status(400).json(err);
        }

    };

    /**
     * 
     * @param {Request} req
     * @param {Response} res
     */

    const blog_delete = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await BlogService.deleteBlog(id);
            return res.json({ message: result });
        } catch (err) {
            return res.status(400).json(err);
        }

    };

    return {
        blog_index,
        blog_create,
        blog_get_by_author,
        blog_update,
        blog_delete
    };
};