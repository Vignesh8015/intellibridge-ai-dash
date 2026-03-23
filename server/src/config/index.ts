import mockDb from './mockDatabase';

const useMockDb = process.env.USE_MOCK_DB !== 'false';

export { mockDb, useMockDb };
export { getPrismaClient } from './database';
