import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTreeCarpetaAnexo } from './grafico-tree-carpeta-anexo';

describe('GraficoTreeCarpetaAnexo', () => {
  let component: GraficoTreeCarpetaAnexo;
  let fixture: ComponentFixture<GraficoTreeCarpetaAnexo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoTreeCarpetaAnexo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoTreeCarpetaAnexo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
