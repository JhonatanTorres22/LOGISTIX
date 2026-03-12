import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCarpetas } from './list-carpetas';

describe('ListCarpetas', () => {
  let component: ListCarpetas;
  let fixture: ComponentFixture<ListCarpetas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCarpetas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCarpetas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
