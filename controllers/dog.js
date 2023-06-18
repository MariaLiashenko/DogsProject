const db = require("../index");
const { celebrate, Joi, Segments } = require("celebrate");

const createValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        color: Joi.string().required(),
        tail_length: Joi.number().positive().required(),
        weight: Joi.number().positive().required(),
    }),
});

module.exports = {
    createValidation,
    create,
    getAll,
};

async function getAll(req, res, next) {
    try {
        const { attribute, order, pageNumber, limit } = req.query;

        let sortOptions = [];
        if (attribute && order) {
            sortOptions = [[attribute, order]];
        }

        const { count, rows } = await db.Dog.findAndCountAll({
            order: sortOptions,
            limit: limit ? parseInt(limit) : undefined,
            offset: pageNumber && limit ? (parseInt(pageNumber) - 1) * parseInt(limit) : undefined,
        });

        res.status(200).json({ count, dogs: rows });
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const { name, color, tail_length, weight } = req.body;

        if (await db.Dog.findOne({ where: { name } })) {
            return res.status(409).json({ error: `Name "${name}" is already registered` });
        }

        const newDog = {
            name,
            color,
            tail_length,
            weight,
        };

        const savedDog = await db.Dog.create(newDog);

        res.status(200).json(savedDog);
    } catch (err) {
        next(err);
    }
}
