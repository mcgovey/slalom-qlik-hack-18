import React from 'react';
import QlikObject from './QlikObject';
// import QlikFilter from './QlikFilter';
import QlikTable from './QlikTable';
import qProps from '../qProps';

const PageTwo = () => (
  <div className="container">

    <section className="my-3">
      <QlikObject qProp={qProps.testCube} type="qHyperCube" Component={QlikTable} componentProps={{ columnWidths: [50, 50] }} />
    </section>
  </div>
);

export default PageTwo;
