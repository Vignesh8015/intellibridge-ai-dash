import { Request, Response } from 'express';
import { generateRestApi, generateOpenApiSpec, generateGraphQLSchema } from '../services/apiGenerator.service';

export const generate = async (req: Request, res: Response) => {
  try {
    const { moduleName, type = 'rest' } = req.body;
    if (!moduleName) {
      return res.status(400).json({ error: 'moduleName is required' });
    }

    const { code, endpoints } = generateRestApi(moduleName);
    const openApiSpec = generateOpenApiSpec(moduleName, endpoints);
    const graphqlSchema = generateGraphQLSchema(moduleName);

    res.json({
      rest: { code, endpoints },
      openapi: openApiSpec,
      graphql: graphqlSchema,
    });
  } catch (error) {
    res.status(500).json({ error: 'API generation failed' });
  }
};
