/**
 * @typedef {import("mongoose").Model} Model
 */

/**
 * 
 * @param {Model} Blog 
*/

module.exports = (Blog) => {

    const DOCUMENTS_PER_PAGE = 5;

    const getAll = ({ page = 0, projection } = {}) => {
        return new Promise((resolve, reject) => {
            let Query = Blog.find({}).lean();
            Query = Query.skip(page * DOCUMENTS_PER_PAGE).limit(DOCUMENTS_PER_PAGE);
            Query = projection ? Query.select(projection) : Query.select("-__v");
            Query.exec()
                .then(docs => {
                    if (!docs.length)
                        return reject({
                            status: false,
                            message: "No more blog found."
                        });
                    return resolve({
                        status: true,
                        message: docs
                    });
                })
                .catch(() => {
                    return reject({
                        status: false,
                        message: "Query find error."
                    });
                });
        });
    };

    const getByAuthor = (author) => {
        return new Promise((resolve, reject) => {
            Blog.find({})
                .where({ author })
                .select("-__v")
                .exec()
                .then(docs => {
                    if (!docs.length)
                        return reject({
                            status: false,
                            message: "Author not found"
                        });
                    return resolve({
                        status: true,
                        message: docs
                    });
                })
                .catch(() => {
                    return reject({
                        status: false,
                        message: "An error has occured."
                    });
                });
        });
    };

    const getById = (_id) => {
        return new Promise((resolve, reject) => {
            Blog.find({})
                .where({ _id })
                .select("-__v")
                .exec()
                .then(docs => {
                    if (!docs.length)
                        return reject({
                            status: false,
                            message: "Blog not found."
                        });
                    return resolve({
                        status: true,
                        message: docs
                    });
                }).catch(() => {
                    return reject({
                        status: false,
                        message: "Error while finding by id"
                    });
                });
        });
    };

    const create = (data) => {
        return new Promise((resolve, reject) => {
            Blog.create(data).then(() => {
                resolve({
                    status: true,
                    message: "Document saved"
                });
            }).catch(() => {
                reject({
                    status: false,
                    message: "An error has occured."
                });
            });
        });
    };

    const update = (id, data) => {
        return new Promise((resolve, reject) => {
            Blog.findOne({ _id: id }).then(doc => {
                if (!doc)
                    return reject({
                        status: false,
                        message: "Document not found."
                    });
                doc.set(data);
                doc.save().then(() => {
                    return resolve({
                        status: true,
                        message: { ...data }
                    });
                }).catch(() => {
                    return reject({
                        status: false,
                        message: "Unable to save the document"
                    });
                });

            }).catch(() => {
                return reject({
                    status: false,
                    message: "An error has occured."
                });
            });
        });
    };

    const deleteById = (id) => {
        return new Promise((resolve, reject) => {
            Blog.findByIdAndDelete(id).then(doc => {
                if (!doc)
                    return reject({
                        status: false,
                        message: "Document not found"
                    });
                return resolve({
                    status: true,
                    message: "Document deleted"
                });
            }).catch(() => {
                return reject({
                    status: false,
                    message: "Document not found"
                });
            });
        });
    };

    return {
        getAll,
        getByAuthor,
        getById,
        deleteById,
        create,
        update
    };

};