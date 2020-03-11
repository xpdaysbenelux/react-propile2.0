import { build, fake, sequence, oneOf } from 'test-data-bot';
import { UserState } from '../users/_models';
import { IProfile } from '../profile/_models';
import { createDefaultPermissions } from '../_utils/permissionsHelper';

export const profileBuilder: () => IProfile = build('Profile').fields({
  createdAt: fake(f => f.date.past().toISOString()),
  createdBy: fake(f => f.internet.email()),
  email: fake(f => f.internet.email()),
  firstName: fake(f => f.name.firstName()),
  id: sequence(x => `user-${x}`),
  lastName: fake(f => f.name.lastName()),
  permissions: createDefaultPermissions(),
  state: oneOf(...Object.values(UserState)),
  updatedAt: fake(f => f.date.past().toISOString()),
  updatedBy: fake(f => f.internet.email()),
});
