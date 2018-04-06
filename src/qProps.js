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
        // qNumFormat: {
        //   qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        // },
      },
      qSortBy: { qSortByNumeric: -1 },
    }],
  },
};

export default qProps;
