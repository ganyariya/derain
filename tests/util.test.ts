import { assertEquals } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { replaceAt } from "../components/util.ts";

Deno.test("replaceAt can replace text", () => {
  const original = "abcdefghijk";
  const change = "cake";
  const actual = replaceAt(original, 2, change);
  const expected = "abcakeghijk";
  assertEquals(actual, expected);
});
