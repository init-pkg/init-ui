// @vitest-environment jsdom
import React from "react";
import { safeJSONStringify } from "@/utils/stringify";
import { describe, expect, it } from "vitest";

describe("safe-stringify", () => {
  it("should return a string", () => {
    expect(safeJSONStringify({ a: 1 })).toBe('{"a":1}');
  });

  it("Should stringify jsx as a string", () => {
    expect(safeJSONStringify({ a: <div>Hello</div> })).toBe(
      '{"a":"<div>Hello</div>"}'
    );
  });

  it("Should stringify a function as a string", () => {
    expect(safeJSONStringify({ a: () => {} })).toBe('{"a":"a() { ... }"}');
  });

  it("Should stringify normal value jsx and function", () => {
    expect(safeJSONStringify({ a: <div>Hello</div>, b: () => {}, c: 1 })).toBe(
      '{"a":"<div>Hello</div>","b":"b() { ... }","c":1}'
    );
  });

  it("should stringify array of objects", () => {
    const data = [
      { a: 1, b: () => {} },
      { b: 2, c: <div>Hello</div> },
    ];

    expect(safeJSONStringify({ a: data })).toBe(
      '{"a":[{"a":1,"b":"b() { ... }"},{"b":2,"c":"<div>Hello</div>"}]}'
    );
  });
});
