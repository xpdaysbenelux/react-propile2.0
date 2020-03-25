import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';

import { translations } from '../../_translations';
import { Button, Icon } from '../../_shared';

const ConferencesOverview: FC = () => {
  return (
    <Container as="main">
      <header className="header">
        <h3>{translations.getLabel('CONFERENCES.OVERVIEW.CONFERENCES')}</h3>
        <Button href="/conferences/create-conference" isTextLink>
          <Icon name="SvgAdd" size={1.6} />
          {translations.getLabel('CONFERENCES.OVERVIEW.CREATE_CONFERENCE')}
        </Button>
      </header>
    </Container>
  );
};

export default ConferencesOverview;
