import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

const LoadingIndicator = () => (
  <div>
    <CircularProgress
      size={100}
      top={20}
      style={{ marginLeft: '45%' }}
    />
  </div>
);

export default LoadingIndicator;
