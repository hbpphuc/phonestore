exports.getAllProduct = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        title: 'This is get all product controller & route',
    });
};
