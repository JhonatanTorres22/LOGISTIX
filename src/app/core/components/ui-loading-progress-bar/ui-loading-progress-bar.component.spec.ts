import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLoadingProgressBarComponent } from './ui-loading-progress-bar.component';

describe('UiLoadingProgressBarComponent', () => {
  let component: UiLoadingProgressBarComponent;
  let fixture: ComponentFixture<UiLoadingProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLoadingProgressBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiLoadingProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
