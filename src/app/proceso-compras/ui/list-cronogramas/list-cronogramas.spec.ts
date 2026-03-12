import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCronogramas } from './list-cronogramas';

describe('ListCronogramas', () => {
  let component: ListCronogramas;
  let fixture: ComponentFixture<ListCronogramas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCronogramas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCronogramas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
