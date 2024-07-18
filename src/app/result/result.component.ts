import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent {
  @Input() score?: number;
  @Input() totalQuestions?: number;
  @Output() restart = new EventEmitter<void>();

  onRestart() {
    this.restart.emit();
  }
}
