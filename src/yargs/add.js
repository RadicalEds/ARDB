const packageInfo = require('../../package.json');
const name = packageInfo.name;

exports.command = 'add <feed>';
exports.describe = 'Add New Feed';

exports.builder = function (yargs) {
}



exports.handler = async function (argv) {

	// Maybe Add Some Feed Validation Here

	const mongo = await require('../database/client.js')({});
	const feeds = await mongo.db.collection('feeds');

	// new feed
	const feed = {
		name: '',
		url: argv.feed,
		items: [],          // array of item ids, items will be stored in items collection
		refresh_rate: 3600,
		last_checked: null,
	}

	const result = await feeds.insertOne(feed);

	await mongo.connection.close()

	console.log(result)
}
