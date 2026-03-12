import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditConsultaRuc } from './add-edit-consulta-ruc';

describe('AddEditConsultaRuc', () => {
  let component: AddEditConsultaRuc;
  let fixture: ComponentFixture<AddEditConsultaRuc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditConsultaRuc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditConsultaRuc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
