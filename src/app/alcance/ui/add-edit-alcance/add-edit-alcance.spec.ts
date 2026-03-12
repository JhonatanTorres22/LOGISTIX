import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAlcance } from './add-edit-alcance';

describe('AddEditAlcance', () => {
  let component: AddEditAlcance;
  let fixture: ComponentFixture<AddEditAlcance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAlcance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAlcance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
