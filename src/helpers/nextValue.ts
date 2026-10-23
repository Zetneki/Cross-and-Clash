export function nextValue<T>(options: readonly T[], currentValue: T): T {
  return options[(options.indexOf(currentValue) + 1) % options.length];
}
