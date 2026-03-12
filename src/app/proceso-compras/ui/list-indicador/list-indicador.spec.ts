import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIndicador } from './list-indicador';

describe('ListIndicador', () => {
  let component: ListIndicador;
  let fixture: ComponentFixture<ListIndicador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListIndicador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIndicador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
