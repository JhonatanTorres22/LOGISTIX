import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCategoria } from './add-edit-categoria';

describe('AddEditCategoria', () => {
  let component: AddEditCategoria;
  let fixture: ComponentFixture<AddEditCategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCategoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCategoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
