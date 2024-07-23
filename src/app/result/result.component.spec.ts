// import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
// import { ResultComponent } from './result.component';

// fdescribe('ResultComponent', () => {
//   let spectator: Spectator<ResultComponent>;
//   const createComponent = createComponentFactory(ResultComponent);

//   beforeEach(() => {
//     spectator = createComponent();
//   });

//   it('creates the component', () => {
//     expect(spectator.component).toBeTruthy();
//   });

//   it('displays the correct score and total questions', () => {
//     spectator.setInput('score', 8);
//     spectator.setInput('totalQuestions', 10);
//     spectator.detectChanges();

//     const scoreElement = spectator.query('div.score');
//     const totalQuestionsElement = spectator.query('div.total-questions');

//     expect(scoreElement).toHaveText('8');
//     expect(totalQuestionsElement).toHaveText('10');
//   });

//   it('emits restart event when onRestart is called', () => {
//     spyOn(spectator.component.restart, 'emit');
//     spectator.component.onRestart();
//     expect(spectator.component.restart.emit).toHaveBeenCalled();
//   });

//   it('displays the percentage correctly', () => {
//     spectator.setInput('score', 8);
//     spectator.setInput('totalQuestions', 10);
//     spectator.detectChanges();

//     const percentageElement = spectator.query('div.percentage');
//     const expectedPercentage = (8 / 10) * 100;

//     expect(percentageElement).toHaveText(`${expectedPercentage}%`);
//   });

//   it('displays the correct message based on percentage', () => {
//     const testCases = [
//       { score: 8, totalQuestions: 10, expectedMessage: 'Great job!' },
//       { score: 5, totalQuestions: 10, expectedMessage: 'Good effort!' },
//       { score: 3, totalQuestions: 10, expectedMessage: 'Keep trying!' }
//     ];

//     testCases.forEach(testCase => {
//       spectator.setInput('score', testCase.score);
//       spectator.setInput('totalQuestions', testCase.totalQuestions);
//       spectator.detectChanges();

//       const messageElement = spectator.query('div.message');
//       expect(messageElement).toHaveText(testCase.expectedMessage);
//     });
//   });
// });
