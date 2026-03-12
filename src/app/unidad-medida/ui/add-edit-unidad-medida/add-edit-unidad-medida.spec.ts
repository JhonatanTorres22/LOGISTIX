import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUnidadMedida } from './add-edit-unidad-medida';

describe('AddEditUnidadMedida', () => {
  let component: AddEditUnidadMedida;
  let fixture: ComponentFixture<AddEditUnidadMedida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditUnidadMedida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditUnidadMedida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
