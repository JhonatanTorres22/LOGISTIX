import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServicios } from './list-servicios';

describe('ListServicios', () => {
  let component: ListServicios;
  let fixture: ComponentFixture<ListServicios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListServicios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListServicios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
