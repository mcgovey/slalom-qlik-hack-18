import React from 'react';
import QlikGlobal from './QlikGlobal';
import QlikCurrentSelections from './QlikCurrentSelections';

class CurrentSelectionsBox extends React.Component {
  render() {
    return (
      <div>
        <QlikGlobal Component={QlikCurrentSelections} />
      </div>
    );
  }
}


export default CurrentSelectionsBox;
