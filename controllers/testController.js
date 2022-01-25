const Test = require('../models/Test');
const fetch = require("node-fetch");
const Bustimes = require("../models/Bustimes");

exports.getTestData = (req, res) => {
	let data = [
		new Test('Test name', 12),
		new Test('Second name', 13)
	];
	res.render('testView', {
		data : data,
	});
};

exports.getSecondTestData = (req, res) => {
	let data = [
		new Test('other name', 15),
		new Test('other second name', 16)
	];
	res.render('testView', {
		data : data,
	});
};

exports.getBusTimes = async (req, res) => {
	// const url = "https://api.tfl.gov.uk/StopPoint/Mode/bus/Disruption";
	const url = "https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals?app_key=ba9752d29aad406bbeb76a9fa432df18";
	const response = await fetch(url);
	const bustimesResponse = await response.json();

	bustimesResponse.sort((bus1, bus2) => bus1.timeToStation - bus2.timeToStation);
    

	const bustimes = bustimesResponse.map(
		bus => new Bustimes(
			bus.stationName,
			bus.lineName,
			bus.destinationName,
			Math.floor(bus.timeToStation/60)
		)
	);

	res.render('busTimesView', {
		data: bustimes,
	});
};
