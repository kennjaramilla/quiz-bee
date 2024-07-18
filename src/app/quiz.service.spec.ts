import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { cold } from 'jasmine-marbles';
import { QuizService } from './quiz.service';
import { Question } from './question.model';

describe('QuizService', () => {
  let spectator: SpectatorService<QuizService>;
  const createService = createServiceFactory(QuizService);

  beforeEach(() => spectator = createService());

  it('creates the service', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('returns shuffled and sorted questions', () => {
    const mockQuestions: Question[] = [
      { question: 'Who built the ark?', options: ['Noah', 'Moses', 'Abraham', 'David'], answer: 'Noah', difficulty: 1 },
      { question: 'Where was Jesus born?', options: ['Nazareth', 'Bethlehem', 'Jerusalem', 'Galilee'], answer: 'Bethlehem', difficulty: 1 },
      { question: 'Who received the Ten Commandments?', options: ['Moses', 'Aaron', 'Joshua', 'Joseph'], answer: 'Moses', difficulty: 1 },
      { question: 'Who was swallowed by a great fish?', options: ['Jonah', 'Daniel', 'Elijah', 'Elisha'], answer: 'Jonah', difficulty: 2 },
      { question: 'Who led the Israelites into the Promised Land?', options: ['Moses', 'Aaron', 'Joshua', 'Caleb'], answer: 'Joshua', difficulty: 2 },
      { question: 'Who was the first king of Israel?', options: ['Saul', 'David', 'Solomon', 'Samuel'], answer: 'Saul', difficulty: 2 },
      { question: 'Who was the strongest man in the Bible?', options: ['Samson', 'David', 'Solomon', 'Abraham'], answer: 'Samson', difficulty: 3 },
      { question: 'Who interpreted Pharaoh\'s dreams?', options: ['Joseph', 'Daniel', 'Moses', 'Aaron'], answer: 'Joseph', difficulty: 3 },
      { question: 'What is the longest book in the Bible?', options: ['Psalms', 'Isaiah', 'Genesis', 'Exodus'], answer: 'Psalms', difficulty: 3 },
      { question: 'Who was thrown into the lion\'s den?', options: ['Daniel', 'Joseph', 'David', 'Moses'], answer: 'Daniel', difficulty: 4 }
    ];

    const expectedQuestions: Question[] = [
      { question: 'Who built the ark?', options: ['Noah', 'Moses', 'Abraham', 'David'], answer: 'Noah', difficulty: 1 },
      { question: 'Where was Jesus born?', options: ['Nazareth', 'Bethlehem', 'Jerusalem', 'Galilee'], answer: 'Bethlehem', difficulty: 1 },
      { question: 'Who received the Ten Commandments?', options: ['Moses', 'Aaron', 'Joshua', 'Joseph'], answer: 'Moses', difficulty: 1 },
      { question: 'Who was swallowed by a great fish?', options: ['Jonah', 'Daniel', 'Elijah', 'Elisha'], answer: 'Jonah', difficulty: 2 },
      { question: 'Who led the Israelites into the Promised Land?', options: ['Moses', 'Aaron', 'Joshua', 'Caleb'], answer: 'Joshua', difficulty: 2 },
      { question: 'Who was the first king of Israel?', options: ['Saul', 'David', 'Solomon', 'Samuel'], answer: 'Saul', difficulty: 2 },
      { question: 'Who was the strongest man in the Bible?', options: ['Samson', 'David', 'Solomon', 'Abraham'], answer: 'Samson', difficulty: 3 },
      { question: 'Who interpreted Pharaoh\'s dreams?', options: ['Joseph', 'Daniel', 'Moses', 'Aaron'], answer: 'Joseph', difficulty: 3 },
      { question: 'What is the longest book in the Bible?', options: ['Psalms', 'Isaiah', 'Genesis', 'Exodus'], answer: 'Psalms', difficulty: 3 },
      { question: 'Who was thrown into the lion\'s den?', options: ['Daniel', 'Joseph', 'David', 'Moses'], answer: 'Daniel', difficulty: 4 }
    ];

    const questions$ = spectator.service.getQuestions();

    expect(questions$).toBeObservable(cold('(a|)', { a: expectedQuestions }));
  });

  it('shuffles the questions correctly', () => {
    const questions: Question[] = [
      { question: 'Q1', options: ['A', 'B', 'C', 'D'], answer: 'A', difficulty: 1 },
      { question: 'Q2', options: ['A', 'B', 'C', 'D'], answer: 'B', difficulty: 1 },
      { question: 'Q3', options: ['A', 'B', 'C', 'D'], answer: 'C', difficulty: 1 }
    ];

    const shuffledQuestions = spectator.service['shuffle']([...questions]);

    expect(shuffledQuestions.length).toBe(3);
    expect(shuffledQuestions).toContain(questions[0]);
    expect(shuffledQuestions).toContain(questions[1]);
    expect(shuffledQuestions).toContain(questions[2]);
  });

  it('selects 15 questions and sorts them by difficulty', () => {
    const questions: Question[] = [
      { question: 'Q1', options: ['A', 'B', 'C', 'D'], answer: 'A', difficulty: 1 },
      { question: 'Q2', options: ['A', 'B', 'C', 'D'], answer: 'B', difficulty: 2 },
      { question: 'Q3', options: ['A', 'B', 'C', 'D'], answer: 'C', difficulty: 3 },
      { question: 'Q4', options: ['A', 'B', 'C', 'D'], answer: 'D', difficulty: 4 },
      { question: 'Q5', options: ['A', 'B', 'C', 'D'], answer: 'A', difficulty: 1 },
      { question: 'Q6', options: ['A', 'B', 'C', 'D'], answer: 'B', difficulty: 2 },
      { question: 'Q7', options: ['A', 'B', 'C', 'D'], answer: 'C', difficulty: 3 },
      { question: 'Q8', options: ['A', 'B', 'C', 'D'], answer: 'D', difficulty: 4 },
      { question: 'Q9', options: ['A', 'B', 'C', 'D'], answer: 'A', difficulty: 1 },
      { question: 'Q10', options: ['A', 'B', 'C', 'D'], answer: 'B', difficulty: 2 },
      { question: 'Q11', options: ['A', 'B', 'C', 'D'], answer: 'C', difficulty: 3 },
      { question: 'Q12', options: ['A', 'B', 'C', 'D'], answer: 'D', difficulty: 4 },
      { question: 'Q13', options: ['A', 'B', 'C', 'D'], answer: 'A', difficulty: 1 },
      { question: 'Q14', options: ['A', 'B', 'C', 'D'], answer: 'B', difficulty: 2 },
      { question: 'Q15', options: ['A', 'B', 'C', 'D'], answer: 'C', difficulty: 3 },
      { question: 'Q16', options: ['A', 'B', 'C', 'D'], answer: 'D', difficulty: 4 }
    ];

    const selectedAndSortedQuestions = spectator.service['shuffleAndSelectQuestions'](questions);

    expect(selectedAndSortedQuestions.length).toBe(15);
    expect(selectedAndSortedQuestions[0].difficulty).toBeLessThanOrEqual(selectedAndSortedQuestions[1].difficulty);
    expect(selectedAndSortedQuestions[1].difficulty).toBeLessThanOrEqual(selectedAndSortedQuestions[2].difficulty);
    expect(selectedAndSortedQuestions[2].difficulty).toBeLessThanOrEqual(selectedAndSortedQuestions[3].difficulty);
  });
});
