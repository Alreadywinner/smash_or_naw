import { memo } from 'react';

const withComments = (WrappedComponent) => {
  const WithComments = memo((props) => {
    return <WrappedComponent {...props} />;
  });

  // Set display name for the HOC
  WithComments.displayName = `WithComments(${getDisplayName(
    WrappedComponent,
  )})`;

  return WithComments;
};

// Helper function to get the display name of a component
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withComments;
