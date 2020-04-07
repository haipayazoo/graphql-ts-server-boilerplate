import { request } from 'graphql-request';
import { host } from './constants';
import { createConnection } from 'typeorm';
import { User } from '../entity/User';

const email = 'tom@gmail.com';
const password = 'tom';

const mutation = `
mutation {
  register(email: "${email}", password: "${password}") 
}
`;

test('Regiser user', async () => {
	const response = await request(host, mutation);
	expect(response).toEqual({ register: true });
	await createConnection();
	const users = await User.find({ where: { email } });
	expect(users).toHaveLength(1);
	const user = users[0];
	expect(user.email).toEqual(email);
	expect(user.password).not.toEqual(password);
});

// TODO: Create test database.
// TODO: Drop all data once the test is over.
// TODO: When running test, it should start ther server.
