import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTopicsComponent } from './my-topics.component';

describe('MyTopicsComponent', () => {
  let component: MyTopicsComponent;
  let fixture: ComponentFixture<MyTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
