import { User, Project } from '../types';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// In-memory mock database
class MockDatabase {
  users: User[] = [];
  projects: Project[] = [];

  constructor() {
    this.seed();
  }

  private async seed() {
    const hashedPassword = await bcrypt.hash('demo123', 10);
    this.users.push({
      id: uuidv4(),
      email: 'demo@intellibridge.ai',
      password: hashedPassword,
      name: 'Demo User',
      role: 'admin',
      createdAt: new Date(),
    });
  }

  // User methods
  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async createUser(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const user: User = {
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  // Project methods
  async findProjectsByUserId(userId: string): Promise<Project[]> {
    return this.projects.filter(p => p.userId === userId);
  }

  async findProjectById(id: string): Promise<Project | undefined> {
    return this.projects.find(p => p.id === id);
  }

  async createProject(data: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
    const project: Project = {
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
    };
    this.projects.push(project);
    return project;
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project | undefined> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    this.projects[index] = { ...this.projects[index], ...data };
    return this.projects[index];
  }

  async deleteProject(id: string): Promise<boolean> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.projects.splice(index, 1);
    return true;
  }
}

export const mockDb = new MockDatabase();
export default mockDb;
