const slugify = require("slugify")
const Category = require("../../models/Category.js")

const createCategory = async (req, res) => {
    if (!req.body.name) return badRequestError(res, "Name is required !")

    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`,
        createdBy: req.user._id,
    };

    // if (req.file) {
    //   categoryObj.categoryImage = "/public/" + req.file.filename;
    // }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const newCategory = new Category(categoryObj);

    newCategory.save((error, category) => {
        if (error) return badRequestError(res, "Something went wrong !")
        if (category) {
            return createdResponse(res, category, "Category created successfully !")
        }
    });
};

module.exports = {
    createCategory
}