import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnDestroy {
  @Input() score: number = 0;
  @Input() totalQuestions: number = 0;
  @Input() topic: string = '';
  @Output() restart = new EventEmitter<void>();
  @Output() topicSelected = new EventEmitter<string>();
  suggestedTopics: string[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private readonly quizService: QuizService, 
    private readonly router: Router,
    private readonly changeDetection: ChangeDetectorRef
  ) { 
    this.subscribeToSuggestedTopics();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  private subscribeToSuggestedTopics() {
    this.quizService.getTopics()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((topics: string[]) => {
        this.changeDetection.markForCheck();
        
        this.suggestedTopics = topics.filter(t => t !== this.topic);
      });

    this.quizService.saveProgress(this.topic, this.score, this.totalQuestions);
  }
}
