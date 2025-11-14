const packageInfo = require('../../package.json');
const name = packageInfo.name;

exports.command = 'list';
exports.describe = 'List All Feeds';

exports.builder = function (yargs) {
}

exports.handler = async function (argv) {

	const mongo = await require('../database/client.js')({});
	const feeds = await mongo.db.collection('feeds');

	const data = await feeds.find({}).toArray();
	console.log(JSON.stringify(data));

	await mongo.connection.close()
}
