import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSubtarea } from './details-subtarea';

describe('DetailsSubtarea', () => {
  let component: DetailsSubtarea;
  let fixture: ComponentFixture<DetailsSubtarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsSubtarea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSubtarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
