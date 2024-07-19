import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:3000/api/questions';

  constructor(private http: HttpClient) {}

  getTopics(): Observable<string[]> {
    return this.http.get<Question[]>(this.apiUrl).pipe(
      map(questions => [...new Set(questions.map(q => q.topic))])
    );
  }

  getQuestionsByTopic(topic: string): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl).pipe(
      map(questions => questions.filter(q => q.topic === topic)),
      map(questions => this.shuffleAndSelectQuestions(questions)),
      map(questions => questions.map(q => this.shuffleOptions(q)))
    );
  }

  getProgressByTopic(topic: string): number {
    if (typeof localStorage !== 'undefined') {
      const progress = localStorage.getItem(`progress_${topic}`);
      return progress ? parseInt(progress, 10) : 0;
    }
    return 0;
  }

  saveProgress(topic: string, score: number, totalQuestions: number): void {
    if (typeof localStorage !== 'undefined') {
      const progress = Math.round((score / totalQuestions) * 100);
      localStorage.setItem(`progress_${topic}`, progress.toString());
    }
  }

  private shuffleAndSelectQuestions(questions: Question[]): Question[] {
    const shuffledQuestions = this.shuffle(questions);
    const selectedQuestions = shuffledQuestions.slice(0, 15);
    return selectedQuestions.sort((a, b) => a.difficulty - b.difficulty);
  }

  private shuffleOptions(question: Question): Question {
    const shuffledOptions = this.shuffle(question.options.slice());
    return { ...question, options: shuffledOptions };
  }

  private shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
