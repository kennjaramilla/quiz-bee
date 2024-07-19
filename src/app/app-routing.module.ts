import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicSelectionComponent } from './topic-selection/topic-selection.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: '', component: TopicSelectionComponent },
  { path: 'quiz/:topic', component: QuizComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
