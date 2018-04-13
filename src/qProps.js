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
        // qNumFormat: {
        //   qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        // },
      },
      qSortBy: { qSortByNumeric: -1 },
    }, {
      qDef: {
        qDef: 'MAX(LONGITUDE)',
        qLabel: 'Longitude',
        // qNumFormat: {
        //   qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        // },
      },
      qSortBy: { qSortByNumeric: -1 },
    }],
    qSuppressMissing: true,
    // qSuppressZero: true,
  },
};

qProps.properties = {
  qInfo: {
    qType: 'visualization',
  },
  qHyperCubeDef: {
    qDimensions:
      [{
        qDef: {
          qFieldDefs: ['OBJECTID'],
          qFieldLabels: ['Property'],
          qSortCriterias: [{ qSortByAscii: 1 }],
          // qSuppressMissing: true,
        },
      },
      {
        qDef: {
          qFieldDefs: ['buildpts.Point'],
          qFieldLabels: ['Points'],
          qSortCriterias: [{ qSortByAscii: 1 }],
          qSuppressMissing: true,
        },
      },
      {
        qDef: {
          qFieldDefs: ['buildareas.Area'],
          qFieldLabels: ['Area'],
        },
      }],
    qMeasures: [{
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [Site EUI (kBTU/sf)])',
        qLabel: 'EUI',
        // qNumFormat: {
        //   qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        // },
      },
      // qSortBy: { qSortByNumeric: -1 },
    }, {
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [GHG Intensity (kgCO2/sf)])',
        qLabel: 'GHG Intensity',
        // qNumFormat: {
        //   qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        // },
      },
      // qSortBy: { qSortByNumeric: -1 },
    }, {
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [Energy Star Score])',
        qLabel: 'Energy Star Score',
        // qNumFormat: {
        //   qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        // },
      },
      // qSortBy: { qSortByNumeric: -1 },
    }, {
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [Onsite Renewable (kWh)])',
        qLabel: 'Onsite Renewable Generation',
        // qNumFormat: {
        //   qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        // },
      },
      // qSortBy: { qSortByNumeric: -1 },
    }],
    // qSuppressMissing: true,
    // qSuppressZero: true,
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

qProps.sessionLists = { qInfo: { qType: 'SelectionObject' }, qSelectionObjectDef: {} };

export default qProps;
