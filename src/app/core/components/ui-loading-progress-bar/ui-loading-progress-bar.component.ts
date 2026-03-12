import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';


@Component({
  selector: 'ui-loading-progress-bar',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarModule
  ],
  templateUrl: './ui-loading-progress-bar.component.html',
  styleUrls: ['./ui-loading-progress-bar.component.scss']
})
export class UiLoadingProgressBarComponent {

}
