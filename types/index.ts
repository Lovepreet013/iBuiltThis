export interface FormState {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
}
