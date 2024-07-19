import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-topic-selection',
  templateUrl: './topic-selection.component.html',
  styleUrls: ['./topic-selection.component.scss']
})
export class TopicSelectionComponent implements OnInit {
  topics: { name: string, progress: number }[] = [];

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.topics = this.quizService.getTopics().map(topic => ({
      name: topic,
      progress: this.quizService.getProgressByTopic(topic)
    }));
  }

  selectTopic(topic: string) {
    this.router.navigate(['/quiz', topic]);
  }
}
