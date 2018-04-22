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
qProps.pts = {
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
      }],
    qMeasures: [{
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [GHG Emissions (MTCO2e)])',
        qLabel: 'Emissions',
      },
    }, {
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [Total Site Energy (kBTU)])',
        qLabel: 'Consumption',
      },
    }, {
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [Site EUI (kBTU/sf)])',
        qLabel: 'EUI',
      },
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
qProps['building-shapes'] = {
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
          qFieldDefs: ['buildareas.Area'],
          qFieldLabels: ['Area'],
        },
      }],
    qMeasures: [{
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [GHG Emissions (MTCO2e)])',
        qLabel: 'Emissions',
      },
    }, {
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [Total Site Energy (kBTU)])',
        qLabel: 'Consumption',
      },
    }, {
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [Site EUI (kBTU/sf)])',
        qLabel: 'EUI',
      },
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
qProps.propertyUseList = {
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
qProps.propertyTypeList = {
  qInfo: {
    qType: 'visualization',
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ['Property Type'],
    },
    qShowAlternatives: true,
    qAutoSortByState: { qDisplayNumberOfRows: 1 },
  },
};
qProps.cohortList = {
  qInfo: {
    qType: 'visualization',
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ['Cohort'],
    },
    qShowAlternatives: true,
    qAutoSortByState: { qDisplayNumberOfRows: 1 },
  },
};
qProps.objectList = {
  qInfo: {
    qType: 'visualization',
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ['OBJECTID'],
    },
    qShowAlternatives: false,
    qAutoSortByState: { qDisplayNumberOfRows: 1 },
  },
};
// qProps['city-council-districts'] = {
//   qInfo: {
//     qType: 'visualization',
//   },
//   qListObjectDef: {
//     qDef: {
//       qFieldDefs: ['city-council-districts-id'],
//     },
//     qShowAlternatives: true,
//     qAutoSortByState: { qDisplayNumberOfRows: 1 },
//   },
// };

qProps.neighborhoods = {
  qInfo: {
    qType: 'visualization',
  },
  qHyperCubeDef: {
    qDimensions:
      [{
        qDef: {
          qFieldDefs: ['Neighborhood'],
          qFieldLabels: ['Neighborhood'],
          qSortCriterias: [{ qSortByAscii: 1 }],
          // qSuppressMissing: true,
        },
      },
      {
        qDef: {
          qFieldDefs: ['bos-neighborhoods.Area'],
          qFieldLabels: ['Area'],
        },
      }],

    qMeasures: [{
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [GHG Emissions (MTCO2e)])',
        qLabel: 'Emissions',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [Total Site Energy (kBTU)])',
        qLabel: 'Consumption',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [Site EUI (kBTU/sf)])',
        qLabel: 'EUI',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [GHG Intensity (kgCO2/sf)])',
        qLabel: 'GHG Intensity',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [Energy Star Score])',
        qLabel: 'Energy Star Score',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [Onsite Renewable (kWh)])',
        qLabel: 'Onsite Renewable Generation',
      },
    }],
  },
};
qProps['city-council-districts'] = {
  qInfo: {
    qType: 'visualization',
  },
  qHyperCubeDef: {
    qDimensions:
      [{
        qDef: {
          qFieldDefs: ['city-council-districts-id'],
          qFieldLabels: ['city-council-districts-id'],
          qSortCriterias: [{ qSortByAscii: 1 }],
          // qSuppressMissing: true,
        },
      },
      {
        qDef: {
          qFieldDefs: ['city-council-districts.Area'],
          qFieldLabels: ['Area'],
        },
      }],

    qMeasures: [{
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [GHG Emissions (MTCO2e)])',
        qLabel: 'Emissions',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [Total Site Energy (kBTU)])',
        qLabel: 'Consumption',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [Site EUI (kBTU/sf)])',
        qLabel: 'EUI',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [GHG Intensity (kgCO2/sf)])',
        qLabel: 'GHG Intensity',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [Energy Star Score])',
        qLabel: 'Energy Star Score',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [Onsite Renewable (kWh)])',
        qLabel: 'Onsite Renewable Generation',
      },
    }],
  },
};
qProps['climate-ready-social-vulnerability'] = {
  qInfo: {
    qType: 'visualization',
  },
  qHyperCubeDef: {
    qDimensions:
      [{
        qDef: {
          qFieldDefs: ['Climate-Ready Social Vulnerability'],
          qFieldLabels: ['Climate-Ready Social Vulnerability'],
          qSortCriterias: [{ qSortByAscii: 1 }],
          qSuppressMissing: true,
        },
      },
      {
        qDef: {
          qFieldDefs: ['social-responsibility-areas.Area'],
          qFieldLabels: ['Area'],
        },
      }],

    qMeasures: [{
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [GHG Emissions (MTCO2e)])',
        qLabel: 'Emissions',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [Total Site Energy (kBTU)])',
        qLabel: 'Consumption',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [Site EUI (kBTU/sf)])',
        qLabel: 'EUI',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [GHG Intensity (kgCO2/sf)])',
        qLabel: 'GHG Intensity',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [Energy Star Score])',
        qLabel: 'Energy Star Score',
      },
    }, {
      qDef: {
        qDef: 'Avg({<BERDOYear= {$(=max(BERDOYear))}>} [Onsite Renewable (kWh)])',
        qLabel: 'Onsite Renewable Generation',
      },
    }],
  },
};
qProps['sea-level-rise'] = {
  qInfo: {
    qType: 'visualization',
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ['Sea Level Rise Limit'],
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
// qProps['climate-ready-social-vulnerability'] = {
//   qInfo: {
//     qType: 'visualization',
//   },
//   qListObjectDef: {
//     qDef: {
//       qFieldDefs: ['Climate-Ready Social Vulnerability'],
//     },
//     qShowAlternatives: true,
//     qAutoSortByState: { qDisplayNumberOfRows: 1 },
//   },
// };
qProps.sessionLists = { qInfo: { qType: 'SelectionObject' }, qSelectionObjectDef: {} };

qProps.propertyEmissions = {
  qInfo: {
    qType: 'visualization',
  },
  qHyperCubeDef: {
    qDimensions:
      [{
        qDef: {
          qFieldDefs: ['[Property Name]'],
          qFieldLabels: ['Property'],
          // qSortCriterias: [{ qSortByAscii: 1 }],
          // qSuppressMissing: true,
        },
      }],
    qMeasures: [{
      qDef: {
        qDef: 'SUM({<BERDOYear={$(=max(BERDOYear))}>}[GHG Emissions (MTCO2e)])',
        qLabel: 'Emissions',
        // qNumFormat: {
        //   qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        // },
      },
      qSortBy: { qSortByNumeric: -1 },
    }],
    // qSuppressMissing: true,
    // qSuppressZero: true,
  },
};
qProps.nearEmissionReductTarget = {
  qInfo: {
    qType: 'visualization',
  },
  qHyperCubeDef: {
    qDimensions:
      [{
        qDef: {
          qFieldDefs: ['[Property Name]'],
          qFieldLabels: ['Property'],
          // qSortCriterias: [{ qSortByAscii: 1 }],
          // qSuppressMissing: true,
        },
      }],
    qMeasures: [{
      qDef: {
        qDef: `IF((SUM({<BERDOYear={$(=max(BERDOYear))}>}[GHG Emissions (MTCO2e)])>0 AND SUM({<BERDOYear={$(=max(BERDOYear)-2)}>}[GHG Emissions (MTCO2e)])>0),
        IF((SUM({<BERDOYear={$(=max(BERDOYear))}>}[GHG Emissions (MTCO2e)]) - SUM({<BERDOYear={$(=max(BERDOYear)-2)}>}[GHG Emissions (MTCO2e)]))
        /
        SUM({<BERDOYear={$(=max(BERDOYear)-2)}>}[GHG Emissions (MTCO2e)])<-.15,0,
        (SUM({<BERDOYear={$(=max(BERDOYear))}>}[GHG Emissions (MTCO2e)]) - SUM({<BERDOYear={$(=max(BERDOYear)-2)}>}[GHG Emissions (MTCO2e)]))
        /
        SUM({<BERDOYear={$(=max(BERDOYear)-2)}>}[GHG Emissions (MTCO2e)])),0)`,
        qLabel: 'Emissions',
        // qNumFormat: {
        //   qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        // },
      },
      qSortBy: { qSortByNumeric: 1 },
    }],
    // qSuppressMissing: true,
    // qSuppressZero: true,
  },
};
qProps.propertyEmissionReductions = {
  qInfo: {
    qType: 'visualization',
  },
  qHyperCubeDef: {
    qDimensions:
      [{
        qDef: {
          qFieldDefs: ['[Property Name]'],
          qFieldLabels: ['Property'],
          // qSortCriterias: [{ qSortByAscii: 1 }],
          // qSuppressMissing: true,
        },
      }],
    qMeasures: [{
      qDef: {
        qDef: `IF((SUM({<BERDOYear={$(=max(BERDOYear))}>}[GHG Emissions (MTCO2e)])>0 AND SUM({<BERDOYear={$(=max(BERDOYear)-2)}>}[GHG Emissions (MTCO2e)])>0),
        SUM({<BERDOYear={$(=max(BERDOYear)-2)}>}[GHG Emissions (MTCO2e)])-SUM({<BERDOYear={$(=max(BERDOYear))}>}[GHG Emissions (MTCO2e)]),0)`,
        qLabel: 'Emissions',
        // qNumFormat: {
        //   qType: 'M', qUseThou: 1, qDec: '.', qThou: ',', qFmt: '$#,##0.00;($#,##0.00)',
        // },
      },
      qSortBy: { qSortByNumeric: -1 },
    }],
    // qSuppressMissing: true,
    // qSuppressZero: true,
  },
};

qProps.objectHCList = {
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
          qSuppressMissing: true,
        },
      },
      {
        qDef: {
          qFieldDefs: [`=AGGR(CONCAT({<BERDOYear= {$(=max(BERDOYear))}>} [Property Name],', ')
            ,OBJECTID)`],
          qFieldLabels: ['Property Name'],
        },
      },
      {
        qDef: {
          qFieldDefs: [`=AGGR(CONCAT({<BERDOYear= {$(=max(BERDOYear))}>} [Property Type],', '),
            OBJECTID)`],
          qFieldLabels: ['Property Type'],
        },
      },
      {
        qDef: {
          qFieldDefs: [`=AGGR(CONCAT({<BERDOYear= {$(=max(BERDOYear))}>} [Property Uses],', '),
            OBJECTID)`],
          qFieldLabels: ['Property Use'],
        },
      }],
    qMeasures: [{
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [GHG Emissions (MTCO2e)])',
        qLabel: 'Emissions',
      },
    }, {
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [Total Site Energy (kBTU)])',
        qLabel: 'Consumption',
      },
    }, {
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [Site EUI (kBTU/sf)])',
        qLabel: 'EUI',
      },
    }, {
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [GHG Intensity (kgCO2/sf)])',
        qLabel: 'GHG Intensity',
      },
    }, {
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [Energy Star Score])',
        qLabel: 'Energy Star Score',
      },
    }, {
      qDef: {
        qDef: 'Sum({<BERDOYear= {$(=max(BERDOYear))}>} [Onsite Renewable (kWh)])',
        qLabel: 'Onsite Renewable Generation',
      },
    }],
  },
};

qProps.objectHCTrend = {
  qInfo: {
    qType: 'visualization',
  },
  qHyperCubeDef: {
    qDimensions:
      [{
        qDef: {
          qFieldDefs: ['BERDOYear'],
          qFieldLabels: ['Year'],
          qSortCriterias: [{ qSortByAscii: 1 }],
          qSuppressMissing: true,
        },
      }],
    qMeasures: [{
      qDef: {
        qDef: 'Sum([GHG Emissions (MTCO2e)])',
        qLabel: 'Emissions',
      },
    }, {
      qDef: {
        qDef: 'Sum([Total Site Energy (kBTU)])',
        qLabel: 'Consumption',
      },
    }],
  },
};
export default qProps;
