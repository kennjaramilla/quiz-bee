import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Question } from '../question.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.5s ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class QuestionComponent {
  @Input() question?: Question;
  @Input() currentQuestionIndex: number = 0;
  @Input() totalQuestions: number = 0;
  @Output() answered = new EventEmitter<string>();
  @Output() next = new EventEmitter<void>();

  questionAnswered: boolean = false;

  onAnswer(option: string) {
    this.questionAnswered = true;
    this.answered.emit(option);
  }

  nextQuestion() {
    this.questionAnswered = false;
    this.next.emit();
  }
}
