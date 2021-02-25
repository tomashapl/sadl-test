export function omitByDeep(obj: Object, removeValues: Array<any>) {
  if (typeof obj === "object") {
    return Object.entries(obj)
      .filter(([_, v]) => !removeValues.includes(v))
      .reduce(
        (r, [key, value]) => ({ ...r, [key]: omitByDeep(value, removeValues) }),
        {}
      );
  } else {
    return obj;
  }
}
