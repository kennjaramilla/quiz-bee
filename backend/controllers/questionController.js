const questionService = require('../services/questionService');

exports.getTopics = (req, res) => {
  const topics = questionService.getTopics();
  res.json(topics);
};

exports.getQuestionsByTopic = (req, res) => {
  const topic = req.params.topic;
  const questions = questionService.getQuestionsByTopic(topic);
  res.json(questions);
};
