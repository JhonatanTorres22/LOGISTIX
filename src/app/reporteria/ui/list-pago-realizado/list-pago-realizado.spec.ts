import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPagoRealizado } from './list-pago-realizado';

describe('ListPagoRealizado', () => {
  let component: ListPagoRealizado;
  let fixture: ComponentFixture<ListPagoRealizado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPagoRealizado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPagoRealizado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
