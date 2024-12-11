import { expect, test } from 'vitest';

// Import your validate function (or call your script)
import validate from './validate';

test('validation runs without errors', async () => {
  // If your `validate` function returns a value
  const result = await validate();
  expect(result).toBeTruthy();

  // If `validate` just executes without throwing
  expect(() => validate()).not.toThrow();
});
