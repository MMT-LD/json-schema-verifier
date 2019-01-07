const { getFileNames } = require('../');

describe('Get filenames', () => {
  it('should return a function', () => {
    expect(getFileNames).toEqual(expect.any(Function));
  });

  it('should match if filenames contains expected elements', async () => {
    const path = `${process.cwd()}/schemas`;
    const expected = [`${path}/test.json`, `${path}/test1.json`];
    const fileNames = await getFileNames(`${process.cwd()}/schemas`, '.json');
    expect(fileNames).toEqual(expect.arrayContaining(expected));
  });

  it("should throw with an error if dir can't be found", async () => {
    try {
      await getFileNames('does_not_exist', '.json');
    } catch (e) {
      expect(e).toHaveProperty('message');
    }
  });
});
