export default interface IFilter<T> {
  property: keyof T;
  selectedValue: string;
  values: string[];
}
