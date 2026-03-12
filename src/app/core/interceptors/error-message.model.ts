import { HttpErrorResponse } from '@angular/common/http';

export interface ApiError extends HttpErrorResponse {
  userMessage: string;
}

export interface ApiResponse {
    data: boolean | number;
    errors: any;
    isSuccess: boolean;
    message: string;
}
