import { Component, ContentChild, contentChild, ElementRef, input, TemplateRef } from '@angular/core';
import { SharedModule } from '../shared.module';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [SharedModule,  CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  cardClass = input<string>();
  showHeader = input<boolean>(true);
  showContent = input<boolean>(true);
  headerClass = input<string>();
  actionClass = input<string>();
  cardTitle = input<string>();
  padding = input<number>(24);

  readonly headerOptionsTemplate =
    contentChild<TemplateRef<ElementRef>>('headerOptionsTemplate');

  readonly headerTitleTemplate =
    contentChild<TemplateRef<ElementRef>>('headerTitleTemplate');

  @ContentChild('actionTemplate')
  actionTemplate!: TemplateRef<ElementRef>;
}
