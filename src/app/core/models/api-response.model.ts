export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ApiError | null;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
  timestamp: string;
  traceId?: string;
  details?: Record<string, string[]>;
}

/** Envelope paginado (Shared.Result.PagedApiResponse<T>) */
export interface PagedApiResponse<T> {
  success: boolean;
  data: PagedData<T> | null;
  error: ApiError | null;
}

export interface PagedData<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}