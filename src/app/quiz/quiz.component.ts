import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Question } from '../question.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
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
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  showResult: boolean = false;
  showSummary: boolean = false;
  topic: string = '';
  feedbackMessage: string = '';
  userAnswers: { question: string, userAnswer: string, correctAnswer: string, explanation: string }[] = [];

  constructor(
    private readonly quizService: QuizService, 
    private readonly route: ActivatedRoute, 
    private readonly router: Router,
    private readonly changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.topic = params.get('topic')!;
      this.loadQuestions(this.topic);
    });
  }

  loadQuestions(topic: string): void {
    this.quizService.getQuestionsByTopic(topic).subscribe((questions: Question[]) => {
      this.changeDetection.markForCheck();
      this.questions = questions;
      this.resetQuiz();
    });
  }

  resetQuiz(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.showResult = false;
    this.showSummary = false;
    this.feedbackMessage = '';
    this.userAnswers = [];
  }

  onAnswer(option: string) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const explanation = "This is a brief explanation for the question."; // Replace with actual explanation logic
    this.userAnswers.push({
      question: currentQuestion.question,
      userAnswer: option,
      correctAnswer: currentQuestion.answer,
      explanation: explanation
    });
    
    if (option === currentQuestion.answer) {
      this.score++;
      this.feedbackMessage = 'Correct! Well done!';
    } else {
      this.feedbackMessage = 'Oops! Try the next one.';
    }
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.showSummary = true;
      this.quizService.saveProgress(this.topic, this.score, this.questions.length);
    } else {
      this.feedbackMessage = '';
    }
  }

  restart() {
    this.resetQuiz();
    this.loadQuestions(this.topic);
  }

  selectTopic(topic: string) {
    this.router.navigate(['/quiz', topic]);
  }

  get progress() {
    return (this.currentQuestionIndex / this.questions.length) * 100;
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  onSummaryComplete() {
    this.showSummary = false;
    this.showResult = true;
    this.changeDetection.markForCheck();
  }
}
