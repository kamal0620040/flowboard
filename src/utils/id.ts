export type IdType = "board" | "column" | "card" | "seed";

export function generateId(idType: IdType) {
  return `${idType}-${crypto.randomUUID()}`;
}