import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadArchivoSunat } from './upload-archivo-sunat';

describe('UploadArchivoSunat', () => {
  let component: UploadArchivoSunat;
  let fixture: ComponentFixture<UploadArchivoSunat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadArchivoSunat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadArchivoSunat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
