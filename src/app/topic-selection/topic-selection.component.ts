import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-topic-selection',
  templateUrl: './topic-selection.component.html',
  styleUrls: ['./topic-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicSelectionComponent implements OnDestroy {
  topics: { name: string, progress: number }[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private readonly quizService: QuizService, 
    private readonly router: Router, 
    private readonly changeDetection: ChangeDetectorRef
  ) { 
    this.subscribeToTopicChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectTopic(topic: string) {
    this.router.navigate(['/quiz', topic]);
  }

  private subscribeToTopicChanges() {
    this.quizService.getTopics()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((topics: string[]) => {
      this.changeDetection.markForCheck();

      this.topics = topics.map(topic => ({
        name: topic,
        progress: this.quizService.getProgressByTopic(topic)
      }));
    });
  }
}
