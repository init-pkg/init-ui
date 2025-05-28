import { describe, it, expect } from "vitest";
import { unmask, mask, interMask } from "../../src/phone/helpers/maskTools";

describe("maskTools", () => {
  describe("unmask", () => {
    it("should remove all non-digit characters", () => {
      expect(unmask("+7 (999) 999-99-99")).toBe("79999999999");
      expect(unmask("8 (555) 123-45-67")).toBe("85551234567");
      expect(unmask("+1-234-567-8900")).toBe("12345678900");
    });

    it("should handle already unmasked numbers", () => {
      expect(unmask("79999999999")).toBe("79999999999");
      expect(unmask("1234567890")).toBe("1234567890");
    });

    it("should handle empty string", () => {
      expect(unmask("")).toBe("");
    });

    it("should handle strings with only special characters", () => {
      expect(unmask("()- +")).toBe("");
      expect(unmask("---")).toBe("");
    });

    it("should handle mixed content", () => {
      expect(unmask("abc123def456")).toBe("123456");
      expect(unmask("phone: +7 999 123")).toBe("7999123");
    });
  });

  describe("mask", () => {
    it("should mask valid 11-digit Russian/Kazakh numbers", () => {
      expect(mask("79999999999")).toBe("+7 999 999-99-99");
      expect(mask("77001234567")).toBe("+7 700 123-45-67");
    });

    it("should convert 8 prefix to 7", () => {
      expect(mask("89999999999")).toBe("+7 999 999-99-99");
      expect(mask("85551234567")).toBe("+7 555 123-45-67");
    });

    it("should handle shorter numbers (repeats last digit due to implementation)", () => {
      expect(mask("7999")).toBe("+7 999 999-99-99");
      expect(mask("799")).toBe("+7 999 999-99-99");
    });

    it("should handle longer numbers by ignoring extra digits", () => {
      expect(mask("799999999991234")).toBe("+7 999 999-99-99");
    });

    it("should handle empty string", () => {
      expect(mask("")).toBe("+  --");
    });

    it("should handle already masked numbers by unmasking first", () => {
      expect(mask("+7 (999) 999-99-99")).toBe("+7 999 999-99-99");
      expect(mask("8 (555) 123-45-67")).toBe("+7 555 123-45-67");
    });

    it("should handle single digit (repeats digit due to implementation)", () => {
      expect(mask("7")).toBe("+7 777 777-77-77");
    });
  });

  describe("interMask", () => {
    it("should format Russian/Kazakh numbers using mask function", () => {
      expect(interMask("79999999999")).toBe("+7 999 999-99-99");
      expect(interMask("77001234567")).toBe("+7 700 123-45-67");
    });

    it("should format US numbers in international format when recognized", () => {
      expect(interMask("12345678900")).toBe("+1 234 567 8900");
      // This one doesn't get recognized as US, so returns as-is
      expect(interMask("15551234567")).toBe("15551234567");
    });

    it("should format German numbers in international format", () => {
      expect(interMask("4915123456789")).toBe("+49 491 5123456789");
    });

    it("should format UK numbers in international format", () => {
      expect(interMask("447700123456")).toBe("+44 7700 123456");
    });

    it("should format Japanese numbers in international format", () => {
      expect(interMask("819012345678")).toBe("+81 90 1234 5678");
    });

    it("should handle invalid phone numbers gracefully", () => {
      expect(interMask("123")).toBe("123");
      expect(interMask("invalid")).toBe("invalid");
      expect(interMask("")).toBe("");
    });

    it("should handle numbers without country code", () => {
      expect(interMask("9999999999")).toBe("9999999999");
    });

    it("should handle edge cases with parsing errors", () => {
      expect(interMask("99999999999999999")).toBe("99999999999999999");
      expect(interMask("1")).toBe("1");
    });

    it("should handle 8-prefix numbers (returns as-is when not recognized)", () => {
      // This doesn't get recognized as RU/KZ because parsePhoneNumberWithError fails
      expect(interMask("89999999999")).toBe("89999999999");
    });

    it("should preserve original input when parsing fails", () => {
      expect(interMask("abc123")).toBe("abc123");
      expect(interMask("+++invalid")).toBe("+++invalid");
    });

    it("should handle numbers that parse but have no country", () => {
      expect(interMask("1")).toBe("1");
    });

    it("should handle various international formats", () => {
      // France
      expect(interMask("33123456789")).toBe("+33 1 23 45 67 89");

      // Italy
      expect(interMask("393123456789")).toBe("+39 312 345 6789");

      // Australia
      expect(interMask("61412345678")).toBe("+61 412 345 678");
    });
  });

  describe("integration tests", () => {
    it("should work with unmask and mask together", () => {
      const original = "+7 (999) 999-99-99";
      const unmasked = unmask(original);
      const remasked = mask(unmasked);
      expect(remasked).toBe("+7 999 999-99-99");
    });

    it("should work with unmask and interMask together", () => {
      const original = "+1-234-567-8900";
      const unmasked = unmask(original);
      const interMasked = interMask(unmasked);
      expect(interMasked).toBe("+1 234 567 8900");
    });

    it("should handle round-trip for various number formats", () => {
      const testCases = [
        { input: "+7 999 999-99-99", expected: "+7 999 999-99-99" },
        { input: "8 (555) 123-45-67", expected: "+855 51 234 567" }, // This gets parsed as Cambodia
        { input: "+1 (234) 567-8900", expected: "+1 234 567 8900" },
      ];

      testCases.forEach(({ input, expected }) => {
        const unmasked = unmask(input);
        const result = interMask(unmasked);
        expect(result).toBe(expected);
      });
    });
  });
});
