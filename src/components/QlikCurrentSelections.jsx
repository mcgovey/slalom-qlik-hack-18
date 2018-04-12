import React from 'react';
import PropTypes from 'prop-types';

class QlikCurrentSelections extends React.Component {
  static propTypes = {
    // qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    // offset: PropTypes.func.isRequired,
    // select: PropTypes.func.isRequired,
    // beginSelections: PropTypes.func.isRequired,
    // endSelections: PropTypes.func.isRequired,
    // searchListObjectFor: PropTypes.func.isRequired,
    // acceptListObjectSearch: PropTypes.func.isRequired,
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: 0,
  //   };
  // }

  render() {
    console.log('qlayout', this.props.qLayout);
    return (
      <div>
        <p> I got rendered</p>
      </div>
    );
  }
}


export default QlikCurrentSelections;
