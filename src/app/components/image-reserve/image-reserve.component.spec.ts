import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageReserveComponent } from './image-reserve.component';

describe('ImageReserveComponent', () => {
  let component: ImageReserveComponent;
  let fixture: ComponentFixture<ImageReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageReserveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
