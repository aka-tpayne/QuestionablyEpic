import { getMenuItems } from "./ItemCardButtonWithMenu";

const itemOnTrack = (upgradeTrack: string, level: number) => ({
  upgradeTrack,
  level,
});

describe("getMenuItems", () => {
  test("Veteran 285 offers only Veteran-track downgrades and upgrades", () => {
    const labels = getMenuItems(itemOnTrack("Veteran", 285)).map((entry) => entry.label);

    expect(labels).toEqual([
      "Downgrade to 279",
      "Downgrade to 282",
      "Upgrade to 289",
      "Upgrade to 292",
      "Upgrade to 295",
    ]);
  });

  test("Champion 308 at track cap only offers Champion-track downgrades", () => {
    const labels = getMenuItems(itemOnTrack("Champion", 308)).map((entry) => entry.label);

    expect(labels).toEqual([
      "Downgrade to 292",
      "Downgrade to 295",
      "Downgrade to 298",
      "Downgrade to 302",
      "Downgrade to 305",
    ]);
  });

  test("Hero 308 stays on Hero and does not offer Champion steps", () => {
    const labels = getMenuItems(itemOnTrack("Hero", 308)).map((entry) => entry.label);

    expect(labels).toEqual([
      "Downgrade to 305",
      "Upgrade to 311",
      "Upgrade to 315",
      "Upgrade to 318",
      "Upgrade to 321",
    ]);
  });

  test("items at the track floor have no downgrade options", () => {
    expect(getMenuItems(itemOnTrack("Myth", 318)).map((entry) => entry.label)).toEqual([
      "Upgrade to 321",
      "Upgrade to 324",
      "Upgrade to 328",
      "Upgrade to 331",
      "Upgrade to 334",
    ]);
    expect(getMenuItems(itemOnTrack("Adventurer", 266)).every((entry) => entry.label.startsWith("Upgrade"))).toBe(true);
  });

  test("crafted tracks stay between their spark floor and cap", () => {
    expect(getMenuItems(itemOnTrack("Gilded Crafted", 331)).map((entry) => entry.label)).toEqual([
      "Downgrade to 318",
      "Downgrade to 321",
      "Downgrade to 324",
      "Downgrade to 328",
    ]);
    expect(getMenuItems(itemOnTrack("Runed Crafted", 318)).map((entry) => entry.label)).toEqual([
      "Downgrade to 305",
      "Downgrade to 308",
      "Downgrade to 311",
      "Downgrade to 315",
    ]);
  });

  test("items without a known track have no ilvl options", () => {
    expect(getMenuItems(itemOnTrack("", 308))).toEqual([]);
    expect(getMenuItems(itemOnTrack("Explorer", 263))).toEqual([]);
  });
});
