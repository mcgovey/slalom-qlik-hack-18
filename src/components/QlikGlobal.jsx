import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import qDocPromise from '../qDoc';

// const settings = {
//   qHyperCube: {
//     path: '/qHyperCubeDef',
//     dataFunc: 'getHyperCubeData',
//     selectFunc: 'selectHyperCubeValues',
//     selectArgs: {
//       path: '/qHyperCubeDef', dimIndex: 0, values: [], toggle: true,
//     },
//   },
//   qListObject: {
//     path: '/qListObjectDef',
//     dataFunc: 'getListObjectData',
//     selectFunc: 'selectListObjectValues',
//     selectArgs: { path: '/qListObjectDef', values: [], toggle: true },
//   },
//   expression: {
//     path: null,
//     dataFunc: null,
//   },
// };

export default class QlikObject extends React.Component {
// class extends React.Component {
  static propTypes = {
    // type: PropTypes.oneOf(['qHyperCube', 'qListObject', 'expression']).isRequired,
    Component: PropTypes.func.isRequired,
    // componentProps: PropTypes.object,
    // qPage: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      qDoc: null,
      qObject: null,
      qLayout: null,
      updating: false,
      error: null,
    };
  }

  async componentWillMount() {
    try {
      // const { qDocPromise } = this.props;
      const qProp = { qInfo: { qType: 'SelectionObject' }, qSelectionObjectDef: {} };
      const qDoc = await qDocPromise;
      this.setState({ qDoc });
      const qObject = await qDoc.createSessionObject(qProp);
      qDoc.on('changed', () => { this.update(); });
      this.setState({ qObject }, () => {
        this.update();
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  async getLayout() {
    const { qObject } = this.state;
    const qLayout = await qObject.getLayout();
    return qLayout;
  }

  @autobind
  async update() {
    this.setState({ updating: true });
    const qLayout = await this.getLayout();
    this.setState({ updating: false, qLayout });
  }

  @autobind
  async clearSelections(field, value) {
    this.setState({ updating: true });
    if (field) {
      const qField = await this.state.qDoc.getField(field);
      if (value) {
        await qField.toggleSelect(value);
      } else {
        await qField.clear();
      }
    } else {
      this.state.qDoc.clearAll();
    }
    this.setState({ updating: false });
  }

  render() {
    const {
      qObject, qLayout, error,
    } = this.state;
    if (error) {
      return <div>{error.message}</div>;
    } else if (!qObject || !qLayout) {
      return <div>Loading...</div>;
    }
    const { Component } = this.props;
    return (<Component
      {...this.props}
      {...this.state}
      clearSelections={this.clearSelections}
      update={this.update}
    />);
  }
}
