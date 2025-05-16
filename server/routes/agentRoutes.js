const express = require('express');
const router = express.Router();
const {
  getAllAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent
} = require('../controllers/agentController');

// Public routes
router.get('/', getAllAgents);
router.get('/:id', getAgentById);

// Admin/secured routes (optional based on your auth logic)
router.post('/', createAgent);
router.put('/:id', updateAgent);
router.delete('/:id', deleteAgent);

module.exports = router;
