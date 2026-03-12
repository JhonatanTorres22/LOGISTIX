import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlcance } from './list-alcance';

describe('ListAlcance', () => {
  let component: ListAlcance;
  let fixture: ComponentFixture<ListAlcance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAlcance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAlcance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
