import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRepresentanteLegal } from './list-representante-legal';

describe('ListRepresentanteLegal', () => {
  let component: ListRepresentanteLegal;
  let fixture: ComponentFixture<ListRepresentanteLegal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRepresentanteLegal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRepresentanteLegal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
