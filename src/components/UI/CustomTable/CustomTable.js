import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// Components
import { Table } from "../index";

class CustomTable extends React.Component {
  // Helpers
  _getRowClassName = (record, index) => {
    const { rowClassName, selectedRowKey } = this.props;
    const rowKey = this.props.rowKey
      .split(".")
      .reduce(
        (o, i) => (o === undefined || !(i in o) ? undefined : o[i]),
        record
      );
    let customClassName = _.isFunction(rowClassName)
      ? rowClassName(record, index)
      : null;

    if (selectedRowKey === rowKey) {
      customClassName = customClassName
        ? " ant-table-row-selected"
        : "ant-table-row-selected";
    }

    return customClassName;
  };

  //Event handlers
  _handleRowClick = (record, index) => {
    return {
      onClick: () => {
        const { selectedRowKey, onRowSelected, onCustomRowClick } = this.props;
        const rowKey = this.props.rowKey
          .split(".")
          .reduce(
            (o, i) => (o === undefined || !(i in o) ? undefined : o[i]),
            record
          );

        if (selectedRowKey !== rowKey) {
          if (_.isFunction(onRowSelected)) {
            onRowSelected(rowKey, record, index);
          }
        }

        if (_.isFunction(onCustomRowClick)) {
          onCustomRowClick(record, index);
        }
      }
    };
  };

  render() {
    const { rowKey } = this.props;

    return (
      <Table
        {...this.props}
        rowKey={record =>
          rowKey
            .split(".")
            .reduce(
              (o, i) => (o === undefined || !(i in o) ? undefined : o[i]),
              record
            )
        }
        onRow={this._handleRowClick}
        rowClassName={this._getRowClassName}
      >
        {this.props.children}
      </Table>
    );
  }
}

CustomTable.propTypes = {
  rowKey: PropTypes.string.isRequired,
  selectedRowKey: PropTypes.any,
  children: PropTypes.object,
  onCustomRowClick: PropTypes.func,
  onRowSelected: PropTypes.func,
  rowClassName: PropTypes.func,
  loading: PropTypes.any
};

export default CustomTable;
