export const setInObject = (object: {}, path: string, value: string | number | boolean): {} => {
  const keys = path.split('.');
  if (keys.length !== 2) return;
  const newObject = JSON.parse(JSON.stringify(object)); // Create a deep-copy
  newObject[keys[0]][keys[1]] = value;
  return newObject;
};

export function removeEmptyKeys<T>(object: T): Partial<T> {
  return Object.keys(object).reduce<Partial<T>>((acc, key: string) => {
    if (object[key]) return { ...acc, [key]: object[key] };
    return acc;
  }, {});
}

export function insertUpdatedData<T extends { id: string }>(currentData: T[], updatedData: T[]): T[] {
  const ids = updatedData.map(value => value.id);
  return [...(currentData || []).filter(value => !ids.includes(value.id)), ...updatedData];
}
