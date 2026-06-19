export interface Result<T> {
    isSuccess: boolean;
    data: T | null;
    errors: string[];
    message: string;
}
