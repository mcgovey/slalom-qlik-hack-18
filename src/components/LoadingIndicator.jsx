import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';

// const LoadingIndicator = () => (
//   <div>
//     <CircularProgress
//       size={100}
//       top={20}
//       style={{ marginLeft: '45%' }}
//     />
//   </div>
// );

// export default LoadingIndicator;


class LoadingIndicator extends React.Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    marginLeft: PropTypes.string.isRequired,
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: 0,
  //   };
  // }

  render() {
    return (
      <div>
        <CircularProgress
          size={this.props.size}
          top={20}
          style={{ marginLeft: this.props.marginLeft }}
        />
      </div>
    );
  }
}


export default LoadingIndicator;
