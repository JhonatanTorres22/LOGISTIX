import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDriveCarpetas } from './one-drive-carpetas';

describe('OneDriveCarpetas', () => {
  let component: OneDriveCarpetas;
  let fixture: ComponentFixture<OneDriveCarpetas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneDriveCarpetas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneDriveCarpetas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
