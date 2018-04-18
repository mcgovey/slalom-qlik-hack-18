const qProps = {};

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

qProps['city-council-districts'] = {
  qInfo: {
    qType: 'visualization',
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ['city-council-districts-id'],
    },
    qShowAlternatives: true,
    qAutoSortByState: { qDisplayNumberOfRows: 1 },
  },
};


qProps.neighborhoods = {
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

qProps['sea-level-rise'] = {
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
qProps['groundwater-conversvation'] = {
  qInfo: {
    qType: 'visualization',
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ['Groundwater Conservation'],
    },
    qShowAlternatives: true,
    qAutoSortByState: { qDisplayNumberOfRows: 1 },
  },
};
qProps['climate-ready-social-vulnerability'] = {
  qInfo: {
    qType: 'visualization',
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ['Climate-Ready Social Vulnerability'],
    },
    qShowAlternatives: true,
    qAutoSortByState: { qDisplayNumberOfRows: 1 },
  },
};
qProps.sessionLists = { qInfo: { qType: 'SelectionObject' }, qSelectionObjectDef: {} };

export default qProps;
