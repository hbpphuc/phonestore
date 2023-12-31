class APIFeatures {
    constructor(query, queryString, count) {
        this.query = query;
        this.queryString = queryString;
        this.count = count;
    }

    filter() {
        // 1A. Filtering
        const queryObj = { ...this.queryString };
        const includedFields = ['page', 'sort', 'limit', 'fields'];
        includedFields.forEach((item) => delete queryObj[item]);

        // 1B. Advance Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );

        const formatQ = JSON.parse(queryStr);

        if (queryObj?.category) formatQ.category = queryObj.category;

        if (queryObj?.name)
            formatQ.name = { $regex: queryObj.name, $options: 'i' };

        if (queryObj?.q) {
            delete formatQ.q;
            formatQ['$or'] = [
                { name: { $regex: queryObj.q, $options: 'i' } },
                { email: { $regex: queryObj.q, $options: 'i' } },
            ];
        }

        if (queryObj?.brand) {
            formatQ.brand = { $in: queryObj.brand };
        }

        let colorObj = {};

        if (queryObj?.color) {
            delete formatQ.color;

            let colorArr;

            Array.isArray(queryObj.color)
                ? (colorArr = queryObj?.color)
                : (colorArr = queryObj?.color.split(','));

            const colorQuery = colorArr?.map((item) => ({
                color: { $regex: item, $options: 'i' },
            }));

            colorObj = { $or: colorQuery };
        }

        if (this.query.mongooseCollection.name === 'products')
            this.query = this.query.find({
                ...colorObj,
                ...formatQ,
                quantity: { $gt: 0 },
            });
        else
            this.query = this.query.find({
                ...colorObj,
                ...formatQ,
            });
        this.count = this.query
            .find({ ...colorObj, ...formatQ })
            .clone()
            .count();

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;
