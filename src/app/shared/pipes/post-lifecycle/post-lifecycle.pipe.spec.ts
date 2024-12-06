import { PostLifecyclePipe } from './post-lifecycle.pipe';

describe('PostLifecyclePipe', () => {
  it('create an instance', () => {
    const pipe = new PostLifecyclePipe();
    expect(pipe).toBeTruthy();
  });
});
