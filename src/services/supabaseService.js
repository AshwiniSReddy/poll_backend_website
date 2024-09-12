const supabase = require('../db/supabaseClient');

const fetchAllVotes = async () => {
  const { data, error } = await supabase
    .from('votes')
    .select('*');
  
  if (error) {
    throw new Error('Failed to fetch votes:', error.message);
  }

  return data;
};

const updateVote = async (question, index) => {
  const column = index === 0 ? 'option1' : 'option2';
  const { data, error } = await supabase
    .from('votes')
    .update({ [column]: supabase.raw(`"${column}" + 1`) })
    .match({ question });

  if (error) {
    throw new Error('Failed to update vote:', error.message);
  }

  return data;
};

module.exports = {
  fetchAllVotes,
  updateVote
};
