import React, { FC, useEffect } from 'react';
import { useParams, Redirect, Link, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Item } from 'semantic-ui-react';

import { conferencesSelectors } from '../../_store/selectors';
import { translations } from '../../_translations';
import { GoBackLink, Timestamps } from '../../_shared';
import { formatDate, dateFromISOString } from '../../_utils/timeHelpers';
import { programsActions } from '../../_store/actions';
import ProgramsOverview from '../../programs/overview/ProgramsOverview';

const ConferenceDetail: FC = () => {
  const { conferenceId } = useParams();
  const { url } = useRouteMatch();
  const conference = useSelector(conferencesSelectors.conference(conferenceId));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new programsActions.GetPrograms());
  }, [dispatch]);

  if (!conference) return <Redirect to="/conferences" />;

  function renderHeader() {
    return (
      <header>
        <h1>{conference.name}</h1>
        <Timestamps entity={conference} />
      </header>
    );
  }

  function renderDetailSection() {
    return (
      <Item.Group>
        <h2>{translations.getLabel('CONFERENCES.DETAIL.DETAILS.TITLE')}</h2>
        <Item>
          <Item.Content>
            <Item.Header>{translations.getLabel('CONFERENCES.NAME')}</Item.Header>
            <Item.Description>{conference.name}</Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header>{translations.getLabel('CONFERENCES.START_DATE')}</Item.Header>
            <Item.Description>{formatDate(dateFromISOString(conference.startDate))}</Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header>{translations.getLabel('CONFERENCES.END_DATE')}</Item.Header>
            <Item.Description>{formatDate(dateFromISOString(conference.endDate))}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }

  function renderRoomDetailsSection() {
    return <p>Ello</p>;
  }

  return (
    <Container as="main">
      <GoBackLink label={translations.getLabel('CONFERENCES.DETAIL.BACK')} to="/conferences" />
      {renderHeader()}
      {renderDetailSection()}
      <Link to={`${url}/programs/create-program`}>{translations.getLabel('CONFERENCES.DETAIL.CREATE_PROGRAM')}</Link>
      <ProgramsOverview conferenceId={conferenceId} />
    </Container>
  );
};

export default ConferenceDetail;
