import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadArchivo } from './upload-archivo';

describe('UploadArchivo', () => {
  let component: UploadArchivo;
  let fixture: ComponentFixture<UploadArchivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadArchivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadArchivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
