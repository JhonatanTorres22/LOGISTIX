import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeSolicitudes } from './tree-solicitudes';

describe('TreeSolicitudes', () => {
  let component: TreeSolicitudes;
  let fixture: ComponentFixture<TreeSolicitudes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeSolicitudes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeSolicitudes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
