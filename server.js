const express = require('express');
const bodyParser = require('body-parser');
const Vote = require('./src/models/Vote');  // Ensure the path is correct
const connectDb = require('./connectDb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  
  await connectDb(); // Make sure to wait for the DB connection before inserting data
  // await insertInitialData(); // Then insert the data
});


// Fetch all questions with their vote counts
app.get('/api/questions', async (req, res) => {
  try {
      const questions = await Vote.find();
      res.status(200).json(questions);
  } catch (error) {
      res.status(500).json({ message: "Error fetching questions", error });
  }
});


// Update vote count for a specified option
app.post('/api/vote', async (req, res) => {
  const { questionId, option } = req.body;

  // Determine which option's votes to increment
  const voteIncrement = option === 'option1' ? { option1Votes: 1 } : { option2Votes: 1 };

  try {
      const updatedQuestion = await Vote.findByIdAndUpdate(
          questionId, 
          { $inc: voteIncrement },
          { new: true, returnDocument: 'after' } // Ensures the updated document is returned
      );
      res.status(200).json({
          message: "Vote updated successfully",
          data: {
              option1Votes: updatedQuestion.option1Votes,
              option2Votes: updatedQuestion.option2Votes
          }
      });
  } catch (error) {
      res.status(500).json({ message: "Error updating vote", error });
  }
});


const initialQuestions = [
  {
    question: '⁠Pluto',
    option1: 'Still a planet',
    option1Votes: 0,
    option2: 'Forever rejected',
    option2Votes: 0
  },
  {
    question: '⁠Are viruses truly alive or just complex biochemical entities?',
    option1: 'Truly alive',
    option1Votes: 0,
    option2: 'Complex biochemical entities',
    option2Votes: 0
  },
  {
    question: '⁠⁠Does free will exist?',
    option1: 'Free will exists',
    option1Votes: 0,
    option2: 'Choices are predetermined',
    option2Votes: 0
  },
  {
    question: 'Light',
    option1: 'Particle',
    option1Votes: 0,
    option2: 'Wave',
    option2Votes: 0
  },
  {
    question: 'Do parallel universes exist?',
    option1: 'Yes',
    option1Votes: 0,
    option2: 'No',
    option2Votes: 0
  },
  {
    question: '⁠Is mathematics invented or discovered?',
    option1: 'Invented by humans',
    option1Votes: 0,
    option2: 'Discovered universal truth',
    option2Votes: 0
  },
  {
    question: 'Tomato',
    option1: 'Fruit',
    option1Votes: 0,
    option2: 'Vegetable',
    option2Votes: 0
  },
  {
    question: 'Free Will',
    option1: 'We are making choices',
    option1Votes: 0,
    option2: 'We are cosmic puppets',
    option2Votes: 0
  },
  {
    question: '⁠⁠Are we living in a simulation?',
    option1: 'High-budget simulation',
    option1Votes: 0,
    option2: 'The real deal',
    option2Votes: 0
  },
  {
    question: 'AI Consciousness',
    option1: 'Could get a soul',
    option1Votes: 0,
    option2: 'Just a clever toaster',
    option2Votes: 0
  },

];

const insertInitialData = async () => {
  try {
    await Vote.deleteMany({}); // Clear existing data
    await Vote.insertMany(initialQuestions);
    console.log('Initial data inserted successfully!');
  } catch (error) {
    console.error('Failed to insert initial data:', error);
  }
};
