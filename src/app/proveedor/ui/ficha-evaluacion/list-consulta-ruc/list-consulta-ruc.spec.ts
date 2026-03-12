import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsultaRuc } from './list-consulta-ruc';

describe('ListConsultaRuc', () => {
  let component: ListConsultaRuc;
  let fixture: ComponentFixture<ListConsultaRuc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListConsultaRuc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConsultaRuc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
