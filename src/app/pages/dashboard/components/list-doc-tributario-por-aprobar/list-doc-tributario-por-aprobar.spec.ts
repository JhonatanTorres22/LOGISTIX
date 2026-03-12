import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocTributarioPorAprobar } from './list-doc-tributario-por-aprobar';

describe('ListDocTributarioPorAprobar', () => {
  let component: ListDocTributarioPorAprobar;
  let fixture: ComponentFixture<ListDocTributarioPorAprobar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDocTributarioPorAprobar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDocTributarioPorAprobar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
