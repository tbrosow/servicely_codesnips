// TABLE API SNIPSETS

// DELETE RECORDS 
function deleteRecords(_table) {
	var log = Logger("ServerScript");
	log.logLevel("TRACE")

	let records = Table(_table).query();
	while (records.next()) {
		log.info("Delete ... " + records.id())
		// records.delete();
	}
}

deleteRecords("C_DevelopmentTask");

//########################################################################################################################
// CLIENT - SERVER 
//########################################################################################################################

//**************************************** UI Event ********************************************************************** */
var requestObj = {

	action: "getSubmitter"
};

WS.controller("DevTrackerUtils", requestObj)

	//If the assignee does not have the current assignment group as a group, clear the assignee
	.done(function (response) {

		console.log("DevTrackerUtils RESPONSE: " + JSON.stringify(response));
		current.C_Submitter(response.data.userID);

		//If there was an error, simply add it to the console log.
	}).fail(function (response) {
		console.log("DevTrackerUtils FAILED");

	});
//**************************************** System controller ********************************************************************** */
switch (action) {
	case "getSubmitter":
		let answer = { validRecord: false }
		answer.userID = user.getID()

		break;
}

//########################################################################################################################
//########################################################################################################################





var log = Logger("TB");
let current = Table("C_Story").EQUAL("id", "022d015869ee11edb43606cc0f36f02e").query().next();
log.info(current.Id())
log.info("AG" + current.C_AssignmentGroup().getID());

Table('User').EQUAL('active', true)
	.SUBQUERY(
		'group', EQUAL('id', current.C_AssignmentGroup().getID())
	)
	.each(printUserName);

function printUserName(_rec) {
	log.info("UN" + _rec.UserName());
}




