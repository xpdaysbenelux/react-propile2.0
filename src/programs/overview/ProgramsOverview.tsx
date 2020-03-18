import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { translations } from '../../_translations';
import { Button, Icon } from '../../_shared';
import './programsOverview.scss';

const ProgramsOverview: FC = () => {
  return (
    <Container as="main">
      <header className="header">
        <h3>{translations.getLabel('PROGRAMS.PROGRAMS')}</h3>
        <div className="create-buttons">
          <Button href="/programs/create-program" isTextLink>
            <Icon name="SvgAdd" size={1.6} />
            {translations.getLabel('PROGRAMS.CREATE_PROGRAM')}
          </Button>
          <Button href="/programs/create-conference" isTextLink>
            <Icon name="SvgAdd" size={1.6} />
            {translations.getLabel('PROGRAMS.CREATE_CONFERENCE')}
          </Button>
        </div>
      </header>
    </Container>
  );
};

export default ProgramsOverview;
