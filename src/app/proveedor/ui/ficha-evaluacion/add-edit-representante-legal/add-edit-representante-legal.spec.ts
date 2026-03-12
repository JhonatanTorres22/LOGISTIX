import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRepresentanteLegal } from './add-edit-representante-legal';

describe('AddEditRepresentanteLegal', () => {
  let component: AddEditRepresentanteLegal;
  let fixture: ComponentFixture<AddEditRepresentanteLegal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRepresentanteLegal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRepresentanteLegal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
