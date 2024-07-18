import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Question } from '../question.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  showResult: boolean = false;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe((questions: Question[]) => {
      this.questions = questions;
    });
  }

  onAnswer(option: string) {
    if (option === this.questions[this.currentQuestionIndex].answer) {
      this.score++;
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.showResult = true;
    }
  }

  restart() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.showResult = false;
    this.quizService.getQuestions().subscribe((questions: Question[]) => {
      this.questions = questions;
    });
  }
}
