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
// MAP #getID #getLinkForUI #hasField #evaluate #getDisplayValue #TableClass
//########################################################################################################################
var ret = Table("C_DevelopmentTask")
	// .EQUAL("Status", "open")
	// .EQUAL("Assignee", "29dbdc7f607811edb43606cc0f36f02e")
	// .NOT_EMPTY("ParentRecord")
	.query()
	.map(record => {
		return {
			task_id: record.ID(),
			task_id2: record.getID(),
			task_id3: record.id,
			task_description: record.Description(),
			task_link: record.getLinkForUI({ relative: true, aspect: "SelfService" }),

			description: record.hasField("ShortDescription") ? record.ShortDescription() : null,
			requested_by: record.hasField("Requestor") ? record.evaluate("Requestor.getDisplayValue()") : null,

			display_value: record.getDisplayValue(),
			table_class: record.TableClass()
		};
	});
log.info(JSON.stringify(ret, null, 4))
//########################################################################################################################



var log = Logger("TB");
let current = Table("C_DevelopmentTask").EQUAL("CreatedBy", "1df1988b53e211edb43606cc0f36f02e").query();
log.info(current.Id())


while (current.next()) {
	log.info(current.Number())
	current.delete();
}

var log = Logger("TB");
let current = Table("C_DevelopmentTask").EQUAL("CreatedBy", "1df1988b53e211edb43606cc0f36f02e").query().next();
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




