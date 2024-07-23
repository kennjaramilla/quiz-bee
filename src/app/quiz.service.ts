import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getTopics(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/topics`);
  }

  getQuestionsByTopic(topic: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions/${topic}`);
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
      console.log('topic', topic);
      localStorage.setItem(`progress_${topic}`, progress.toString());
    }
  }
}
