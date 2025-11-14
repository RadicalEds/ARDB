var router = require('express').Router();

// api route

router.post('/update/:feed', async function(req, res, next) {
	// manually edit feed settings/details
	res.send("Under Construction");
});

router.get('/check/:feed', async function(req, res, next) {
	// manually trigger a feed to check for new entries
	res.send("Under Construction");
});


module.exports = {
    path: '/api',
    handler: router
}
