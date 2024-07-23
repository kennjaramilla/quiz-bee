const connection = require('../config/dbConfig');

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const parseOptions = (options) => {
    try {
        return JSON.parse(options);
    } catch (e) {
        console.error('Error parsing options:', e);
        return options;
    }
};

const shuffleOptions = (question) => {
    const parsedOptions = parseOptions(question.options);
    const shuffledOptions = shuffle(parsedOptions);
    return { ...question, options: shuffledOptions };
};

const getShuffledQuestions = (questions, count) => {
    const shuffledQuestions = shuffle(questions);
    const selectedQuestions = shuffledQuestions.slice(0, count);
    return selectedQuestions.sort((a, b) => a.difficulty - b.difficulty).map(q => shuffleOptions(q));
};

exports.getTopics = (callback) => {
    const query = 'SELECT topic, description FROM topics';
    connection.query(query, (error, results) => {
        if (error) throw error;
        const topics = results.map(row => ({ topic: row.topic, description: row.description }));
        callback(topics);
    });
};

exports.getQuestionsByTopic = (topic, callback) => {
    const query = 'SELECT * FROM questions WHERE topic = ?';
    connection.query(query, [topic], (error, results) => {
        if (error) throw error;
        const questions = getShuffledQuestions(results, 15);
        console.log('Fetched questions:', questions); // Add logging here
        callback(questions);
    });
};
