import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelStrip } from './channel-strip';

describe('ChannelStrip', () => {
  let component: ChannelStrip;
  let fixture: ComponentFixture<ChannelStrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelStrip],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelStrip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
