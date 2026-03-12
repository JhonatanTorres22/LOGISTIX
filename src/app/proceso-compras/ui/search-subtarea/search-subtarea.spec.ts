import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSubtarea } from './search-subtarea';

describe('SearchSubtarea', () => {
  let component: SearchSubtarea;
  let fixture: ComponentFixture<SearchSubtarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSubtarea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSubtarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
