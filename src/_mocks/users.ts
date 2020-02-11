import { build, fake, sequence, oneOf } from 'test-data-bot';
import { UserState, IUser } from '../users/_models';

export const userBuilder: () => IUser = build('User').fields({
  createdAt: fake(f => f.date.past().toISOString()),
  email: fake(f => f.internet.email()),
  firstName: fake(f => f.name.firstName()),
  id: sequence(x => `user-${x}`),
  lastName: fake(f => f.name.lastName()),
  roles: fake(f => [
    {
      id: f.random.uuid(),
      name: f.lorem.word(),
    },
  ]),
  state: oneOf(...Object.values(UserState)),
  updatedAt: fake(f => f.date.past().toISOString()),
});
