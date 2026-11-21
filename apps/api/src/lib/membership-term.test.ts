import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { subscriptionIdsToComplete } from "./membership-term.js";

describe("subscriptionIdsToComplete", () => {
  it("keeps a longer higher tier that ends before the latest row", () => {
    const ids = subscriptionIdsToComplete([
      {
        id: "pro-plus",
        endDate: new Date("2028-11-20T00:00:00.000Z"),
        durationMonths: 48,
      },
      {
        id: "pro",
        endDate: new Date("2030-11-20T00:00:00.000Z"),
        durationMonths: 12,
      },
    ]);

    assert.deepEqual(ids, []);
  });

  it("completes a same-or-lower tier that ends sooner", () => {
    const ids = subscriptionIdsToComplete([
      {
        id: "pro",
        endDate: new Date("2027-11-20T00:00:00.000Z"),
        durationMonths: 12,
      },
      {
        id: "pro-plus",
        endDate: new Date("2030-11-20T00:00:00.000Z"),
        durationMonths: 48,
      },
    ]);

    assert.deepEqual(ids, ["pro"]);
  });
});
