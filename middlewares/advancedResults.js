const advancedResults = (model, populate) => async (req, res, next) => {
    // copy req.query
	const reqQuery = {...req.query};

	// Fields to exclude
	const removeFields = ['select', 'sort', 'limit', 'page'];

	// Loops over the remove fields and delete them from reqQuery
	removeFields.forEach(param => delete reqQuery[param]);

	let query;
	//Create a query string
	let queryStr = JSON.stringify(reqQuery);

	// Create operators like lte gt gte lt in using regExpressions
	queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

	// finding the resource
	query = model.find(JSON.parse(queryStr));

	// Select fields
	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	// Sort fields
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		query = query.sort('-createdAt');
	}

	// Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 1;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await model.countDocuments();
	console.log(total);

	query = query.skip(startIndex).limit(limit);

    // Adding the populate to our query
    if (populate) {
        query = query.populate(populate);
    }

	// Executing the query
	const results = await query;

	// Pagination result
	const pagination = {}

	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit
		}
	}
	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit
		}
    }
    
    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    }

    next();
}

module.exports = advancedResults