import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Question } from '../question.model';

@Component({
  selector: 'app-topic-summary',
  templateUrl: './topic-summary.component.html',
  styleUrls: ['./topic-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicSummaryComponent {
  @Input() topic: string = '';
  @Input() questions: Question[] = [];
  @Input() userAnswers: { question: string, userAnswer: string, correctAnswer: string, explanation: string }[] = [];
  @Output() restartQuiz = new EventEmitter<void>();
  @Output() goToHome = new EventEmitter<void>();
  @Output() summaryComplete = new EventEmitter<void>();

  onRestartQuiz() {
    this.restartQuiz.emit();
  }

  onGoToHome() {
    this.goToHome.emit();
  }

  onSummaryComplete() {
    this.summaryComplete.emit();
  }
}
