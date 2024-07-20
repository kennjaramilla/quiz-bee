const connection = require('../config/dbConfig');

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffleOptions = (question) => {
  const shuffledOptions = shuffle(JSON.parse(question.options));
  return { ...question, options: shuffledOptions };
};

const getShuffledQuestions = (questions, count) => {
  const shuffledQuestions = shuffle(questions);
  const selectedQuestions = shuffledQuestions.slice(0, count);
  return selectedQuestions.sort((a, b) => a.difficulty - b.difficulty).map(q => shuffleOptions(q));
};

exports.getTopics = (callback) => {
  const query = 'SELECT DISTINCT topic FROM questions';
  connection.query(query, (error, results) => {
      if (error) throw error;
      const topics = results.map(row => row.topic);
      callback(topics);
  });
};

exports.getQuestionsByTopic = (topic, callback) => {
  const query = 'SELECT * FROM questions WHERE topic = ?';
  connection.query(query, [topic], (error, results) => {
      if (error) throw error;
      const questions = getShuffledQuestions(results, 15);
      callback(questions);
  });
};
