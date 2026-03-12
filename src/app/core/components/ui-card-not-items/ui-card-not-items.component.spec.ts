import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCardNotItemsComponent } from './ui-card-not-items.component';

describe('UiCardNotItemsComponent', () => {
  let component: UiCardNotItemsComponent;
  let fixture: ComponentFixture<UiCardNotItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCardNotItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiCardNotItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
