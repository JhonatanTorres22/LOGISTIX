import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProductos } from './import-productos';

describe('ImportProductos', () => {
  let component: ImportProductos;
  let fixture: ComponentFixture<ImportProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
