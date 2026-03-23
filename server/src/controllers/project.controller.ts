import { Response } from 'express';
import { mockDb } from '../config';
import { AuthRequest } from '../middleware/auth.middleware';

export const listProjects = async (req: AuthRequest, res: Response) => {
  try {
    const projects = await mockDb.findProjectsByUserId(req.userId!);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list projects' });
  }
};

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, language } = req.body;
    const project = await mockDb.createProject({
      name,
      description,
      language,
      status: 'pending',
      userId: req.userId!,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const getProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await mockDb.findProjectById(req.params.id);
    if (!project || project.userId !== req.userId) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get project' });
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await mockDb.findProjectById(req.params.id);
    if (!project || project.userId !== req.userId) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const updated = await mockDb.updateProject(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await mockDb.findProjectById(req.params.id);
    if (!project || project.userId !== req.userId) {
      return res.status(404).json({ error: 'Project not found' });
    }
    await mockDb.deleteProject(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
