var router = require('express').Router();

// db route

router.get('/:collection/:objectid', async function(req, res, next) {
	const mongo = await req.app.locals.apps.get('database');
	try {
		const result = await mongo.db.collection(req.params.collection).findOne({_id: new mongo.ObjectId(req.params.objectid)});
		res.send(result);
	} catch(e) {
		res.send("Object Not Found");
	}
});


module.exports = {
    path: '/db',
    handler: router
}
