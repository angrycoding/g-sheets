var {google} = require('googleapis'),
	Sheets = google.sheets('v4'),
	authorization = null;

function init(privateKey, ret) {
	jwtClient = new google.auth.JWT(privateKey.client_email, null, privateKey.private_key, ['https://www.googleapis.com/auth/spreadsheets']);
	jwtClient.authorize(function(error) {
		if (!error) authorization = jwtClient;
		ret(error);
	});
}

function addRow(spreadsheetId, sheetId, row, ret) {
	Sheets.spreadsheets.values.append({
		auth: authorization,
		spreadsheetId: spreadsheetId,
		range: sheetId + '!A1',
		valueInputOption: 'RAW',
		insertDataOption: 'INSERT_ROWS',
		resource : {
			majorDimension: 'ROWS',
			range: sheetId + '!A1',
			values: [row]
		}
	}, function(error, r) {
		// console.info(r);
		ret(error);
	});
}

module.exports = {
	init: init,
	addRow: addRow
};