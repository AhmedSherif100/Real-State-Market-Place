const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController.js');
const { protect } = require('../middlewares/auth/authMiddleware');

router.get('/', agentController.getAllAgents); 
router.get('/:id', agentController.getAgentById); 
router.post('/', agentController.createAgent); 
router.patch('/:id', agentController.updateAgentById); 
router.delete('/:id', agentController.deleteAgentById); 


router.get('/:id/phone', protect, agentController.getAgentPhoneNumber);

module.exports = router; 