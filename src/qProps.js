const qProps = {};

qProps.testList = {
  qInfo: {
    qType: 'visualization',
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ['Property Uses'],
    },
    qShowAlternatives: true,
    qAutoSortByState: { qDisplayNumberOfRows: 1 },
  },
};

qProps.testCube = {
  qInfo: {
    qType: 'visualization',
  },
  qHyperCubeDef: {
    qDimensions: [{
      qDef: {
        qFieldDefs: ['Property Uses'],
        qFieldLabels: ['Property'],
        qSortCriterias: [{ qSortByAscii: 1 }],
        qSuppressMissing: true,
      },
    }],
    qMeasures: [{
      qDef: {
        qDef: 'Sum(BERDOBuildingListCounter)',
        qLabel: 'Count of Buildings',
        qSuppressMissing: true,
        // qNumFormat: {
        //   qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        // },
      },
      qSortBy: { qSortByNumeric: -1 },
    }],
  },
};

qProps.buildingPts = {
  qInfo: {
    qType: 'visualization',
  },
  qHyperCubeDef: {
    qDimensions: [{
      qDef: {
        qFieldDefs: ['PID'],
        qFieldLabels: ['Property'],
        qSortCriterias: [{ qSortByAscii: 1 }],
        qSuppressMissing: true,
      },
    }],
    qMeasures: [{
      qDef: {
        qDef: 'MAX(LATITUDE)',
        qLabel: 'Latitude',
        qSuppressMissing: true,
        // qNumFormat: {
        //   qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        // },
      },
      qSortBy: { qSortByNumeric: -1 },
    }, {
      qDef: {
        qDef: 'MAX(LONGITUDE)',
        qLabel: 'Longitude',
        qSuppressMissing: true,
        // qNumFormat: {
        //   qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        // },
      },
      qSortBy: { qSortByNumeric: -1 },
    }],
  },
};

qProps.neighborhoodList = {
  qInfo: {
    qType: 'visualization',
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ['Neighborhood'],
    },
    qShowAlternatives: true,
    qAutoSortByState: { qDisplayNumberOfRows: 1 },
  },
};

export default qProps;
