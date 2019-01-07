const { getFileNames, readFile } = require('../');

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

describe('Read file from directory', () => {
  it('should return a function', () => {
    expect(readFile).toBeInstanceOf(Function);
  });

  it('should return the file specified and be parsed', async () => {
    const file = await readFile(`${process.cwd()}/schemas/ref.json`);
    expect(file).toBeInstanceOf(Object);
    expect(file).toHaveProperty('properties');
    expect(file.properties).toHaveProperty('place');
  });

  it('should return the file specified and be parsed', async () => {
    try {
      await readFile(`${process.cwd()}/schemas/1234567.json`);
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toEqual(
        `ENOENT: no such file or directory, open '${process.cwd()}/schemas/1234567.json'`,
      );
    }
  });
});
