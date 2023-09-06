const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const { AppError, APIFeatures } = require('../utils');

exports.getAll = (Model, popOptions) =>
    asyncHandler(async (req, res, next) => {
        // EXECUTE QUERY
        const features = new APIFeatures(Model.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .pagination();

        let docs;

        if (popOptions) docs = features.query.populate(popOptions);

        docs = await features.query.find();

        let total;

        if (Object.keys(req.query).length > 0) total = await features.count;
        else total = await Model.find().count();

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: docs.length,
            data: {
                data: docs,
            },
            pagination: {
                total,
            },
        });
    });

exports.getOne = (Model, popOptions) =>
    asyncHandler(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);

        const doc = await query;

        if (!doc) {
            return next(new AppError('No document found with this id', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });

exports.getOneSlug = (Model, popOptions) =>
    asyncHandler(async (req, res, next) => {
        let query = Model.findOne({ slug: req.params.slug });
        if (popOptions) query = query.populate(popOptions);

        const doc = await query;

        if (!doc) {
            return next(new AppError('No document found with that name', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });

exports.createOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        console.log('body:', req.body);

        const imageCover = req?.files?.imageCover[0].path;
        if (imageCover) req.body.imageCover = imageCover;

        const images = req?.files?.images?.map((item) => item.path);
        if (images) req.body.images = images;

        const newDoc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: newDoc,
            },
        });
    });

exports.updateOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (doc.slug)
            doc.slug = slugify(doc.name, { lower: true, locale: 'vi' });

        if (!doc) {
            return next(new AppError('No document found with this ID', 404));
        }

        await doc.save();

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });

exports.deleteOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError('No document found with this ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: null,
        });
    });
