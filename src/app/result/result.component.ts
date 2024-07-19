import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnInit {
  @Input() score: number = 0;
  @Input() totalQuestions: number = 0;
  @Input() topic: string = '';
  @Output() restart = new EventEmitter<void>();
  @Output() topicSelected = new EventEmitter<string>();
  suggestedTopics: string[] = [];

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.suggestedTopics = this.quizService.getTopics().filter(t => t !== this.topic);
    this.quizService.saveProgress(this.topic, this.score, this.totalQuestions);
  }

  onRestart() {
    this.restart.emit();
  }

  onSelectTopic(topic: string) {
    this.router.navigate(['/quiz', topic]);
  }

  onHome() {
    this.router.navigate(['/']);
  }

  getResultMessage(): string {
    const percentage = (this.score / this.totalQuestions) * 100;
    if (percentage >= 80) {
      return 'Excellent job!';
    } else if (percentage >= 50) {
      return 'Good effort!';
    } else {
      return 'Keep trying!';
    }
  }

  getProgress(topic: string): number {
    return this.quizService.getProgressByTopic(topic);
  }
}
