const express = require('express');
const router = express.Router();

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const TeacherProjectController = require('../../controllers/TeacherControllers/TeacherProjectController');
const CommitteeEvaluationController = require('../../controllers/TeacherControllers/CommitteeEvaluationController');
const SupervisorEvaluationController = require('../../controllers/TeacherControllers/SupervisorEvaluationController');

const stdTechCrudController = require('../../controllers/AdminControllers/stdTechCrudController');

const CommitteeAssignedProjectsController = require('../../controllers/TeacherControllers/CommitteeAssignedProjectsController');
router.post('/getTeacher', stdTechCrudController.getTeacher);
// Project Management
router.post('/project', TeacherProjectController.addProject)
router.put('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), TeacherProjectController.updateProject)
router.post('/deleteProject',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), TeacherProjectController.deleteProject)
router.post('/getProject',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee ), TeacherProjectController.getProject)
router.get('/allProject',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee ), TeacherProjectController.getAllProject)
router.post('/getTeacherForMyProjects',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee ), TeacherProjectController.getTeacherForMyProjects)


  
// Evaluations
router.get('/getSupervisorRubrics', SupervisorEvaluationController.getSupervisorRubrics)

router.post('/SupervisorEvaluation', SupervisorEvaluationController.AddSupervisorEvaluation)
router.get('/getSupervisorEvaluation', SupervisorEvaluationController.getSupervisorEvaluation)
router.get('/getAllSupervisorEvaluation', SupervisorEvaluationController.getAllSupervisorEvaluation)

router.get('/getCommitteeRubrics', CommitteeEvaluationController.getCommitteeRubrics)

router.post('/CommitteeEvaluation', CommitteeEvaluationController.AddCommitteeEvaluation)
router.get('/getCommitteeEvaluation', CommitteeEvaluationController.getCommitteeEvaluation)
router.get('/getAllCommitteeEvaluation', CommitteeEvaluationController.getAllCommitteeEvaluation)

// View AssignedGroups

router.get('/getAssignedGroup', CommitteeAssignedProjectsController.getOneGroup); 
router.get('/getAllAssignedGroup', CommitteeAssignedProjectsController.getAllGroup); 



module.exports = router;