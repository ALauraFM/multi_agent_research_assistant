export interface GenerateReportRequest {
  topic: string;
  context?: string;
  language?: string;
}

export interface GenerateReportResponse {
  topic: string;
  research: string;
  insights: string;
  report: string;
  review: string;
  approved: boolean;
  iterations: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function generateReport(
  request: GenerateReportRequest
): Promise<GenerateReportResponse> {
  const params = new URLSearchParams();
  params.append('topic', request.topic);
  if (request.context) {
    params.append('context', request.context);
  }
  params.append('language', request.language || 'en');

  const response = await fetch(`${API_BASE_URL}/generate?${params.toString()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `Failed to generate report: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}
