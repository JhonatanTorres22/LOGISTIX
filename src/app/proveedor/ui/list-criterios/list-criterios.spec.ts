import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCriterios } from './list-criterios';

describe('ListCriterios', () => {
  let component: ListCriterios;
  let fixture: ComponentFixture<ListCriterios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCriterios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCriterios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
