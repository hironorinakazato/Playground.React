import React from 'react';

type PanelProps = {
  id: number;
  column: number;
  row: number;
  current: number;
}

export class Panel extends React.Component<PanelProps> {
  render() {
    const bgColor = this.props.current === this.props.id ? 'on' : 'off';
    return (<div className={`panel column${this.props.column} row${this.props.row} ${bgColor}`}></div>);
  }
}
