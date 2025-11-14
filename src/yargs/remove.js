const packageInfo = require('../../package.json');
const name = packageInfo.name;

exports.command = 'remove <feed>';
exports.describe = 'Remove Feed From Database';

//exports.builder = function (yargs) {}

exports.handler = async function (argv) {

	// Maybe Add Some Feed Validation Here

	const mongo = await require('../database/client.js')({});
	const feeds = await mongo.db.collection('feeds');

	// remove feed by url
	const result = await feeds.deleteOne({url: argv.feed});

	await mongo.connection.close()

	// check result
	if (result.deletedCount === 0){
		console.log(`Feed Not Found: ${argv.feed}`)
		process.exit(1)
	} else {
		console.log(`Removed Feed: ${argv.feed}`)
	}
}
