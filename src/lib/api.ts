const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('intellibridge_token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('intellibridge_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('intellibridge_token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private async request<T>(method: string, path: string, body?: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }
    return res.json();
  }

  // Auth
  async login(email: string, password: string) {
    const data = await this.request<{ token: string; user: any }>('POST', '/api/auth/login', { email, password });
    this.setToken(data.token);
    return data;
  }

  async register(email: string, password: string, name: string) {
    const data = await this.request<{ token: string; user: any }>('POST', '/api/auth/register', { email, password, name });
    this.setToken(data.token);
    return data;
  }

  async getProfile() {
    return this.request<any>('GET', '/api/auth/profile');
  }

  // Projects
  async listProjects() {
    return this.request<any[]>('GET', '/api/projects');
  }

  async createProject(data: { name: string; description?: string; language: string }) {
    return this.request<any>('POST', '/api/projects', data);
  }

  async deleteProject(id: string) {
    return this.request<any>('DELETE', `/api/projects/${id}`);
  }

  // Code Scanner
  async uploadAndScan(file: File, projectId?: string) {
    const formData = new FormData();
    formData.append('file', file);
    if (projectId) formData.append('projectId', projectId);
    
    const res = await fetch(`${this.baseUrl}/api/code-scanner/upload`, {
      method: 'POST',
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
      body: formData,
    });
    if (!res.ok) throw new Error('Scan failed');
    return res.json();
  }

  // Containerizer
  async generateContainer(language: string, appName: string) {
    return this.request<any>('POST', '/api/containerizer/generate', { language, appName });
  }

  // API Generator
  async generateApi(moduleName: string) {
    return this.request<any>('POST', '/api/api-generator/generate', { moduleName });
  }

  // Migration Estimator
  async estimateMigration(data: { projectId?: string; sourceLanguage: string; targetLanguage: string; linesOfCode: number; complexity: number }) {
    return this.request<any>('POST', '/api/migration-estimator/estimate', data);
  }

  // Security Analyzer
  async runSecurityScan(code: string, language: string, projectId?: string) {
    return this.request<any>('POST', '/api/security-analyzer/scan', { code, language, projectId });
  }

  // Reports
  async generateReport(projectId: string, type: string, data?: any) {
    return this.request<any>('POST', '/api/reports/generate', { projectId, type, data });
  }

  async getProjectReports(projectId: string) {
    return this.request<any[]>('GET', `/api/reports/project/${projectId}`);
  }
}

export const api = new ApiClient(API_BASE_URL);
export default api;
