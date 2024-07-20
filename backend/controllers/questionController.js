const questionService = require('../services/questionService');

exports.getTopics = (req, res) => {
  questionService.getTopics((topics) => {
    res.json(topics);
  });
};

exports.getQuestionsByTopic = (req, res) => {
  const topic = req.params.topic;
  questionService.getQuestionsByTopic(topic, (questions) => {
    res.json(questions);
  });
};
