import IFilter from "./IFilter";

// filter n properties for truthy or falsy values on type T (no effect if no filter selected)
export function genericFilter<T>(object: T, filters: Array<IFilter<T>>) {
  // no filters; no effect - return true
  if (filters.length === 0) {
    return true;
  }

  return filters.every((filter) => {
    return filter.isActive ? object[filter.property] : !object[filter.property];
  });
}
