export const objectFilter = <T>(obj: T) =>
  Object.keys(obj as object).reduce(
    (result, key) =>
      !!obj[key as keyof T]
        ? Object.assign(result, { [key]: obj[key as keyof T] })
        : result,
    {},
  )
