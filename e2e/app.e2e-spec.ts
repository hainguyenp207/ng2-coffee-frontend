import { ThecoffeePage } from './app.po';

describe('thecoffee App', () => {
  let page: ThecoffeePage;

  beforeEach(() => {
    page = new ThecoffeePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
