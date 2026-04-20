import { getLeads } from '../app/actions';

test('debe retornar una lista de leads desde la base de datos', async () => {
  const leads = await getLeads();
  expect(Array.isArray(leads)).toBe(true);
});
