const express = require('express');
const router = express.Router();
const stdTechCrudController = require('../controllers/AdminControllers/stdTechCrudController');
const tempplateController = require('../controllers/AdminControllers/templateController');
const announcementController = require('../controllers/AdminControllers/announcementController');
const rubricsController = require('../controllers/AdminControllers/rubricsController');
const committeeController = require('../controllers/AdminControllers/committeeController');
const assignCommitteeController = require('../controllers/AdminControllers/assignCommitteeController');


router.post('/student', stdTechCrudController.addNewStudent);
router.post('/teacher', stdTechCrudController.addNewTeacher);

router.put('/student', stdTechCrudController.updateStudent);
router.put('/teacher', stdTechCrudController.updateTeacher);

router.delete('/student/:regno', stdTechCrudController.deleteStudent);
router.delete('/teacher/:email', stdTechCrudController.deleteTeacher);

router.get('/getStudent', stdTechCrudController.getStudent);
router.get('/getTeacher', stdTechCrudController.getTeacher);

router.get('/getAllStudents', stdTechCrudController.getAllStudent);
router.get('/getAllTeachers', stdTechCrudController.getAllTeacher); 

router.post('/template', tempplateController.addTemplate); 
router.put('/template', tempplateController.updateTemplate); 
router.delete('/template/:title', tempplateController.deleteTemplate); 
router.get('/getAllTemplate', tempplateController.getAllTemplate); 
router.get('/getTemplate', tempplateController.getTemplate); 

router.post('/announcement', announcementController.addAnnouncement); 
router.put('/announcement', announcementController.updateAnnouncement); 
router.delete('/announcement/:title', announcementController.deleteAnnouncement); 
router.get('/getAllAnnouncement', announcementController.getAllAnnouncement); 
router.get('/getAnnouncement', announcementController.getAnnouncement); 


router.post('/supervisorRubrics', rubricsController.addSupervisorRubrics); 
// router.put('/supervisorRubrics', rubricsController.updateAnnouncement); 
router.delete('/supervisorRubrics', rubricsController.deleteSupervisorRubrics); 
router.get('/getSupervisorRubrics', rubricsController.getSupervisorRubrics); 

router.put('/supervisorAddQuestion', rubricsController.supervisorAddQuestion); 
router.put('/supervisorDeleteQuestion', rubricsController.supervisorDeleteQuestion); 

router.put('/committeeAddQuestion', rubricsController.committeeAddQuestion); 
router.put('/committeeDeleteQuestion', rubricsController.committeeDeleteQuestion); 





 router.post('/committeeRubrics', rubricsController.addCommitteeRubrics); 
// router.put('/committeeRubrics', rubricsController.updateAnnouncement); 
 router.delete('/committeeRubrics', rubricsController.deleteCommitteeRubrics); 
 router.get('/getCommitteeRubrics', rubricsController.getCommitteeRubrics); 



router.post('/committee', committeeController.addCommittee); 
// router.put('/committee', committeeController.updateCommittee); 
router.put('/deleteCommittee', committeeController.deleteCommittee); 
router.get('/getCommittee', committeeController.getCommittee); 
router.get('/getAllCommittee', committeeController.getAllCommittee); 



router.put('/assignProjectCommittee', assignCommitteeController.addGroup); 
router.put('/deleteProjectCommittee', assignCommitteeController.deleteGroup); 
router.get('/getProjectCommittee', assignCommitteeController.getOneGroup); 
router.get('/getAllProjectCommittee', assignCommitteeController.getAllGroup); 

router.get('/getAssignedProject', assignCommitteeController.getAssignedProject); 







module.exports = router;