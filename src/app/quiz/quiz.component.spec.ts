import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { cold } from 'jasmine-marbles';
import { QuizComponent } from './quiz.component';
import { QuizService } from '../quiz.service';
import { Question } from '../question.model';

describe('QuizComponent', () => {
  let spectator: Spectator<QuizComponent>;
  const createComponent = createComponentFactory({
    component: QuizComponent,
    mocks: [QuizService]
  });

  const mockQuestions: Question[] = [
    { question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], answer: 'Paris', difficulty: 1 },
    { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4', difficulty: 1 }
  ];

  beforeEach(() => {
    spectator = createComponent();
  });

  it('creates the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('initializes questions on ngOnInit', () => {
    const quizService = spectator.inject(QuizService);
    quizService.getQuestions.and.returnValue(cold('a|', { a: mockQuestions }));

    spectator.component.ngOnInit();

    expect(spectator.component.questions).toBeObservable(cold('a|', { a: mockQuestions }));
  });

  it('increments score and currentQuestionIndex on correct answer', () => {
    spectator.component.questions = mockQuestions;
    spectator.component.currentQuestionIndex = 0;
    spectator.component.score = 0;

    spectator.component.onAnswer('Paris');

    expect(spectator.component.score).toBe(1);
    expect(spectator.component.currentQuestionIndex).toBe(1);
  });

  it('does not increment score on wrong answer', () => {
    spectator.component.questions = mockQuestions;
    spectator.component.currentQuestionIndex = 0;
    spectator.component.score = 0;

    spectator.component.onAnswer('London');

    expect(spectator.component.score).toBe(0);
    expect(spectator.component.currentQuestionIndex).toBe(1);
  });

  it('shows result after last question', () => {
    spectator.component.questions = mockQuestions;
    spectator.component.currentQuestionIndex = 1;

    spectator.component.onAnswer('4');

    expect(spectator.component.showResult).toBe(true);
  });

  it('restarts the quiz correctly', () => {
    const quizService = spectator.inject(QuizService);
    quizService.getQuestions.and.returnValue(cold('a|', { a: mockQuestions }));

    spectator.component.restart();

    expect(spectator.component.currentQuestionIndex).toBe(0);
    expect(spectator.component.score).toBe(0);
    expect(spectator.component.showResult).toBe(false);
    expect(spectator.component.questions).toBeObservable(cold('a|', { a: mockQuestions }));
  });
});
