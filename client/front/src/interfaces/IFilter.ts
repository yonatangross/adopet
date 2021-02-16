
export default interface IFilter<T> {
    property: keyof T;
    isActive: boolean;
}