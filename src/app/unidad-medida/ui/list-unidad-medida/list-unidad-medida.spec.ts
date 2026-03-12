import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnidadMedida } from './list-unidad-medida';

describe('ListUnidadMedida', () => {
  let component: ListUnidadMedida;
  let fixture: ComponentFixture<ListUnidadMedida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUnidadMedida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUnidadMedida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
