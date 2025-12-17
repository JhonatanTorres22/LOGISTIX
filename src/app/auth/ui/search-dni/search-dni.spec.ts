import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDni } from './search-dni';

describe('SearchDni', () => {
  let component: SearchDni;
  let fixture: ComponentFixture<SearchDni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDni]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDni);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
