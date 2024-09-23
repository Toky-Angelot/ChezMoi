import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondClocheComponent } from './fond-cloche.component';

describe('FondClocheComponent', () => {
  let component: FondClocheComponent;
  let fixture: ComponentFixture<FondClocheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FondClocheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FondClocheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
