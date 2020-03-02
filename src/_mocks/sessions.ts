import { build, fake, sequence } from 'test-data-bot';
import { ISession } from '../sessions/_models';

export const sessionWithAllValuesBuilder: () => ISession = build('Session').fields({
  createdAt: fake(f => f.date.past().toISOString()),
  description: fake(f => f.lorem.sentences()),
  firstPresenter: {
    email: fake(f => f.internet.email()),
  },
  id: sequence(x => `user-${x}`),
  secondPresenter: {
    email: fake(f => f.internet.email()),
  },
  subTitle: fake(f => f.lorem.sentence()),
  title: fake(f => f.lorem.sentence()),
  updatedAt: fake(f => f.date.past().toISOString()),
  xpFactor: fake(f => f.random.number(10)),
});

export const sessionRequiredValuesBuilder: () => ISession = build('Session').fields({
  createdAt: fake(f => f.date.past().toISOString()),
  description: fake(f => f.lorem.sentences()),
  firstPresenter: {
    email: fake(f => f.internet.email()),
  },
  id: sequence(x => `user-${x}`),
  title: fake(f => f.lorem.sentence()),
  updatedAt: fake(f => f.date.past().toISOString()),
  xpFactor: fake(f => f.random.number(10)),
});
