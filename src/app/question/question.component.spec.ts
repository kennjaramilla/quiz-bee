// import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
// import { QuestionComponent } from './question.component';
// import { Question } from '../question.model';

// describe('QuestionComponent', () => {
//   let spectator: Spectator<QuestionComponent>;
//   const createComponent = createComponentFactory(QuestionComponent);

//   beforeEach(() => {
//     spectator = createComponent();
//   });

//   it('creates the component', () => {
//     expect(spectator.component).toBeTruthy();
//   });

//   it('displays the question and options', () => {
//     const mockQuestion: Question = {
//       question: 'What is the capital of France?',
//       options: ['Paris', 'London', 'Berlin', 'Madrid'],
//       answer: 'Paris',
//       difficulty: 1
//     };

//     spectator.setInput('question', mockQuestion);
//     spectator.detectChanges();

//     const questionElement = spectator.query('.question');
//     const optionElements = spectator.queryAll('.option');

//     expect(questionElement).toHaveText('What is the capital of France?');
//     expect(optionElements.length).toBe(4);
//     expect(optionElements[0]).toHaveText('Paris');
//     expect(optionElements[1]).toHaveText('London');
//     expect(optionElements[2]).toHaveText('Berlin');
//     expect(optionElements[3]).toHaveText('Madrid');
//   });

//   it('emits answered event when an option is selected', () => {
//     const mockQuestion: Question = {
//       question: 'What is the capital of France?',
//       options: ['Paris', 'London', 'Berlin', 'Madrid'],
//       answer: 'Paris',
//       difficulty: 1
//     };

//     spectator.setInput('question', mockQuestion);
//     spectator.detectChanges();

//     spyOn(spectator.component.answered, 'emit');

//     const optionElements = spectator.queryAll('.option');
//     spectator.click(optionElements[0]);

//     expect(spectator.component.answered.emit).toHaveBeenCalledWith('Paris');
//   });
// });
