import React, { FC } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Item } from 'semantic-ui-react';

import { conferencesSelectors } from '../../_store/selectors';
import { translations } from '../../_translations';
import { GoBackLink, Timestamps } from '../../_shared';
import { formatDate, dateFromISOString } from '../../_utils/timeHelpers';
import { IRoom } from '../_models';
import ProgramsOverview from '../../programs/overview/ProgramsOverview';
import './conferenceDetail.scss';

const ConferenceDetail: FC = () => {
  const { conferenceId } = useParams();
  const conference = useSelector(conferencesSelectors.conference(conferenceId));

  if (!conference) return <Redirect to="/conferences" />;

  function renderHeader() {
    return (
      <header>
        <h1>{conference.name}</h1>
        <Timestamps entity={conference} />
      </header>
    );
  }

  function roomDetailsString(room: IRoom) {
    return `${room.name}, ${translations.getLabel('CONFERENCES.OVERVIEW.ROOMS.MAX_PARTICIPANTS')}: ${room.maxParticipants}`;
  }

  function renderDetailSection() {
    return (
      <Item.Group>
        <h2>{translations.getLabel('CONFERENCES.DETAIL.DETAILS.TITLE')}</h2>
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
        <Item>
          <Item.Content>
            <Item.Header>{translations.getLabel('CONFERENCES.OVERVIEW.ROOMS.ROOMS')}</Item.Header>
            {conference.rooms.map((room: IRoom) => {
              return <Item.Description key={room.id}>{roomDetailsString(room)}</Item.Description>;
            })}
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }

  return (
    <Container as="main" className="conference-detail">
      <GoBackLink label={translations.getLabel('CONFERENCES.DETAIL.BACK')} to="/conferences" />
      {renderHeader()}
      {renderDetailSection()}
      <div className="programs">
        <h2>{translations.getLabel('CONFERENCES.DETAIL.PROGRAMS')}</h2>
        <ProgramsOverview conferenceId={conferenceId} />
      </div>
    </Container>
  );
};

export default ConferenceDetail;
