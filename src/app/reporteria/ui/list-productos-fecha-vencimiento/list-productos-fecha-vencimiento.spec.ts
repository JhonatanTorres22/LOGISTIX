import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductosFechaVencimiento } from './list-productos-fecha-vencimiento';

describe('ListProductosFechaVencimiento', () => {
  let component: ListProductosFechaVencimiento;
  let fixture: ComponentFixture<ListProductosFechaVencimiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductosFechaVencimiento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductosFechaVencimiento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
