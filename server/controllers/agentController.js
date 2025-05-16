const Agent = require('../models/agentModel');

// GET /api/agents
const getAllAgents = async (req, res) => {
  try {
    const { search, city, minRating, minExperience } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') }
      ];
    }

    if (city) {
      query.city = new RegExp(city, 'i'); // Assuming agent has `city` in base user model
    }

    if (minRating) {
      query['ratings.averageRating'] = { $gte: parseFloat(minRating) };
    }

    if (minExperience) {
      query.yearsOfExperience = { $gte: parseInt(minExperience) };
    }

    const agents = await Agent.find(query).select('-password'); // Exclude password
    res.status(200).json({
      success: true,
      data: {
        count: agents.length,
        agents
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// GET /api/agents/:id
const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id).select('-password');
    if (!agent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }
    res.status(200).json({ success: true, data: agent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// POST /api/agents
const createAgent = async (req, res) => {
  try {
    const newAgent = new Agent(req.body);
    await newAgent.save();
    res.status(201).json({ success: true, data: newAgent });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data', error });
  }
};

// PUT /api/agents/:id
const updateAgent = async (req, res) => {
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedAgent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }
    res.status(200).json({ success: true, data: updatedAgent });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Update failed', error });
  }
};

// DELETE /api/agents/:id
const deleteAgent = async (req, res) => {
  try {
    const deletedAgent = await Agent.findByIdAndDelete(req.params.id);
    if (!deletedAgent) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }
    res.status(200).json({ success: true, message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed', error });
  }
};

module.exports = {
  getAllAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent
};
