import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProveedores } from './import-proveedores';

describe('ImportProveedores', () => {
  let component: ImportProveedores;
  let fixture: ComponentFixture<ImportProveedores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportProveedores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportProveedores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
