const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController.js');

// All Routes are Public
router.get('/', agentController.getAllAgents); // GET /api/agents
router.get('/:id', agentController.getAgentById); // GET /api/agents/:id
router.post('/', agentController.createAgent); // POST /api/agents
router.patch('/:id', agentController.updateAgentById); // PATCH /api/agents/:id
router.delete('/:id', agentController.deleteAgentById); // DELETE /api/agents/:id

module.exports = router; 