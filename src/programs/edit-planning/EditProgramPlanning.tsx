import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import LoadingSpinner from '../../_shared/loadingSpinner/LoadingSpinner';
import { programsSelectors } from '../../_store/selectors';
import { translations } from '../../_translations';
import { IProgram } from '../_models';

// TODO type the return
// const initialTable = (program: IProgram) => {};

const EditProgramPlanning: FC = () => {
  const { id } = useParams();
  const program = useSelector(programsSelectors.program(id));
  console.log(program);

  return program ? (
    <Container as="main">
      <h1>{translations.getLabel('PROGRAMS.PLANNING.TITLE', { programTitle: program.title })}</h1>
      <div>
        <p>The program starts at ... and ends at ...</p>
        <p>There are ... rooms</p>
        <Link to={`/programs/edit/${program.id}`}>{translations.getLabel('PROGRAMS.PLANNING.EDIT_PARAMS')}</Link>
      </div>
      <p>Program planning</p>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default EditProgramPlanning;
