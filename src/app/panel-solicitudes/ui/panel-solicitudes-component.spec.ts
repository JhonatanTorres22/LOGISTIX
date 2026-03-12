import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSolicitudesComponent } from './panel-solicitudes-component';

describe('PanelSolicitudesComponent', () => {
  let component: PanelSolicitudesComponent;
  let fixture: ComponentFixture<PanelSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelSolicitudesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
