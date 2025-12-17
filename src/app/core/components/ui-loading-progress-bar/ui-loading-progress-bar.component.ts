import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../shared.module';


@Component({
  selector: 'ui-loading-progress-bar',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './ui-loading-progress-bar.component.html',
  styleUrl: './ui-loading-progress-bar.component.scss'
})
export class UiLoadingProgressBarComponent {

}
