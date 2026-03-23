import { ApiEndpoint } from '../types';

export const generateRestApi = (moduleName: string): { code: string; endpoints: ApiEndpoint[] } => {
  const endpoints: ApiEndpoint[] = [
    { method: 'GET', path: `/${moduleName}`, description: `List all ${moduleName}` },
    { method: 'GET', path: `/${moduleName}/:id`, description: `Get ${moduleName} by ID` },
    { method: 'POST', path: `/${moduleName}`, description: `Create new ${moduleName}` },
    { method: 'PUT', path: `/${moduleName}/:id`, description: `Update ${moduleName}` },
    { method: 'DELETE', path: `/${moduleName}/:id`, description: `Delete ${moduleName}` },
  ];

  const code = `import express from 'express';
const router = express.Router();

// GET /${moduleName} - List all
router.get('/', async (req, res) => {
  try {
    const items = await db.${moduleName}.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ${moduleName}' });
  }
});

// GET /${moduleName}/:id - Get by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await db.${moduleName}.findUnique({ where: { id: req.params.id } });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ${moduleName}' });
  }
});

// POST /${moduleName} - Create
router.post('/', async (req, res) => {
  try {
    const item = await db.${moduleName}.create({ data: req.body });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ${moduleName}' });
  }
});

// PUT /${moduleName}/:id - Update
router.put('/:id', async (req, res) => {
  try {
    const item = await db.${moduleName}.update({ where: { id: req.params.id }, data: req.body });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update ${moduleName}' });
  }
});

// DELETE /${moduleName}/:id - Delete
router.delete('/:id', async (req, res) => {
  try {
    await db.${moduleName}.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete ${moduleName}' });
  }
});

export default router;`;

  return { code, endpoints };
};

export const generateOpenApiSpec = (moduleName: string, endpoints: ApiEndpoint[]): string => {
  return JSON.stringify({
    openapi: '3.0.0',
    info: { title: `${moduleName} API`, version: '1.0.0', description: `Auto-generated API for ${moduleName}` },
    paths: Object.fromEntries(
      endpoints.map(ep => [
        ep.path.replace(':id', '{id}'),
        { [ep.method.toLowerCase()]: { summary: ep.description, responses: { '200': { description: 'Success' } } } },
      ])
    ),
  }, null, 2);
};

export const generateGraphQLSchema = (moduleName: string): string => {
  const typeName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
  return `type ${typeName} {
  id: ID!
  name: String!
  description: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Query {
  ${moduleName}s: [${typeName}!]!
  ${moduleName}(id: ID!): ${typeName}
}

type Mutation {
  create${typeName}(name: String!, description: String): ${typeName}!
  update${typeName}(id: ID!, name: String, description: String): ${typeName}!
  delete${typeName}(id: ID!): Boolean!
}

scalar DateTime`;
};
