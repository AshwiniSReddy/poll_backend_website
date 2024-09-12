const supabaseService = require('../services/supabaseService');

exports.getAllVotes = async (req, res) => {
  try {
    const data = await supabaseService.fetchAllVotes();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.storeVote = async (req, res) => {
  try {
    const { question, index } = req.body;
    const data = await supabaseService.updateVote(question, index);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
