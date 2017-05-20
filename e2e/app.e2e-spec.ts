import { BlackboardPage } from './app.po';

describe('blackboard App', function() {
  let page: BlackboardPage;

  beforeEach(() => {
    page = new BlackboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
