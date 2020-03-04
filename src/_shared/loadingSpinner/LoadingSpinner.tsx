import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { translations } from '../../_translations';

const LoadingSpinner = () => (
  <Dimmer active inverted>
    <Loader content={translations.getLabel('SHARED.LOADING')} inverted />
  </Dimmer>
);

export default LoadingSpinner;
