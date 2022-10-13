const express = require('express');
const router = express.Router();

const StudentProjectController = require('../../controllers/StudentControllers/StudentProjectController');
const TeamManagementController = require('../../controllers/StudentControllers/TeamManagementController');

const RequirementController = require('../../controllers/StudentControllers/requirementController');
const SprintController = require('../../controllers/StudentControllers/SprintController');



const DeliverablesController = require('../../controllers/StudentControllers/DeliverablesController');
const TeacherProjectController = require('../../controllers/TeacherControllers/TeacherProjectController');


const StudentEvaluationController = require('../../controllers/StudentControllers/StudentEvaluationController');
const CommitteeEvaluationController = require('../../controllers/TeacherControllers/CommitteeEvaluationController');
const SupervisorEvaluationController = require('../../controllers/TeacherControllers/SupervisorEvaluationController');
const TestPlanController = require('../../controllers/StudentControllers/TestPlanController');
const BugReportController = require('../../controllers/StudentControllers/BugReportController');


const stdTechCrudController = require('../../controllers/AdminControllers/stdTechCrudController');


const NotificationController = require('../../controllers/StudentControllers/NotificationController');

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');




router.post('/getStudentForSupervisorEvaluation', stdTechCrudController.getStudentForSupervisorEvaluation);

router.post('/getStudent', stdTechCrudController.getStudent);
router.post('/project', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), StudentProjectController.getProject)
router.get('/allProject', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), StudentProjectController.getAllProject)
router.put('/project', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), StudentProjectController.updateProject)

// Team Management
router.get('/getAllStudents', stdTechCrudController.getAllStudent);

router.put('/teamMember', verifyRoles(ROLES_LIST.TeamLead), TeamManagementController.addTeamMember)
router.put('/updateRole', verifyRoles(ROLES_LIST.TeamLead), TeamManagementController.updateRole)
router.put('/deleteTeamMember', verifyRoles(ROLES_LIST.TeamLead), TeamManagementController.deleteTeamMember)
router.post('/getTeamMembers',  TeamManagementController.getTeamMembers)


// Deliverables
router.post('/deliverable', DeliverablesController.addDeliverable)
router.put('/deliverable', DeliverablesController.updateDeliverable)
router.put('/getAllDeliverable', DeliverablesController.getAllDeliverable)
router.get('/getDeliverable', DeliverablesController.getDeliverable)
router.delete('/deliverable', DeliverablesController.deleteDeliverable)





//updateDeliverable


// Requirements 


router.post('/requirement', RequirementController.addRequirement)
router.put('/requirementLead', RequirementController.updateRequirementLead)
router.put('/requirementMember', RequirementController.updateRequirementMember)
router.put('/requirement', RequirementController.deleteRequirement)
router.get('/getRequirement', RequirementController.getRequirement)
router.post('/getAllRequirement', RequirementController.getAllRequirement)
router.post('/getStudentRequirement', RequirementController.getStudentRequirement)


//Post, Delete and View Comments in Requirement
router.put('/addRequirementComments', RequirementController.addRequirementComments)
router.put('/deleteRequirementComments', RequirementController.deleteRequirementComments)
router.get('/getRequirementComments', RequirementController.getRequirementComments)

//Testing routes jitnay bhi hoon gaay
router.get('/getTestPlan', TestPlanController.getTestPlan)
router.post('/addTestPlan', TestPlanController.addTestPlan)
router.put('/updateTestPlan', TestPlanController.updateTestPlan)
router.delete('/deleteTestPlan', TestPlanController.deleteTestPlan)

//Debugging Routes
router.get('/getBugReport', BugReportController.getBugReport)
router.post('/addBugReport', BugReportController.addBugReport)
router.put('/updateBugReport', BugReportController.updateBugReport)
router.delete('/deleteBugReport', BugReportController.deleteBugReport)



// Evaluation
router.get('/getEvaluation', StudentEvaluationController.getEvaluation)



// Sprints Routes 
// (Create, View, Edit, Delete sprint) Organize meeting,View Backlogs, delete backlogs, set deadlines
router.get('/getSprint', SprintController.getSprint)
router.post('/addSprint', SprintController.addSprint)
router.put('/updateSprint', SprintController.updateSprint)
router.delete('/deleteSprint', SprintController.deleteSprint)



// Evaluations
router.post('/SupervisorEvaluation', SupervisorEvaluationController.AddSupervisorEvaluation)
router.get('/getSupervisorEvaluation', SupervisorEvaluationController.getSupervisorEvaluation)
router.get('/getAllSupervisorEvaluation', SupervisorEvaluationController.getAllSupervisorEvaluation)

router.post('/CommitteeEvaluation', CommitteeEvaluationController.AddCommitteeEvaluation)
router.get('/getCommitteeEvaluation', CommitteeEvaluationController.getCommitteeEvaluation)
router.get('/getAllCommitteeEvaluation', CommitteeEvaluationController.getAllCommitteeEvaluation)



router.get('/allProject', TeacherProjectController.getAllProject)


//router.post('/getNotifications', NotificationController.getNotifications)
//get all notifictions from students database, req.body will have student ki email.
//router.post('/sendNotification', NotificationController.sendNotification)
//req.body will have 1. Aus student ki email ()Sender email jis ko Notification bejhni, Notification title vagira schema se dekh laina, phir jo bejh raah aus ki email 


// Backlogs
// Notification Post, Join Email/Request
// According to evalution or requirements 
// View report will be considered as evalution


module.exports = router;