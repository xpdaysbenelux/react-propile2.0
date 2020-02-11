import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { config } from '../config';

const Profile: FC = () => {
  return <Container as="main">Welcome to {config.brandName()} admin portal!</Container>;
};

export default Profile;
