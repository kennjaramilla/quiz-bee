import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Question } from '../question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent {
  @Input() question?: Question;
  @Output() answered = new EventEmitter<string>();

  onAnswer(option: string) {
    this.answered.emit(option);
  }
}
