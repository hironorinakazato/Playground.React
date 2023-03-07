import React from 'react';
import { Panel } from './Panel';
import './Panel.css';

type AppState = {
  current: number;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { current: -1 };
  }

  private panels = [
    { column: 1, row: 1 },
    { column: 2, row: 1 },
    { column: 3, row: 1 },
    { column: 4, row: 1 },
    { column: 5, row: 1 },
    { column: 6, row: 1 },
    { column: 7, row: 1 },
    { column: 8, row: 1 },
    { column: 9, row: 1 },
    { column: 10, row: 1 },
    { column: 10, row: 2 },
    { column: 10, row: 3 },
    { column: 9, row: 3 },
    { column: 8, row: 3 },
    { column: 7, row: 3 },
    { column: 6, row: 3 },
    { column: 5, row: 3 },
    { column: 4, row: 3 },
    { column: 3, row: 3 },
    { column: 2, row: 3 },
    { column: 1, row: 3 },
    { column: 1, row: 2 }
  ];

  private intervalId: number = 0;

  componentDidMount() {
    this.intervalId =
      Number(
        setInterval(
          () => {
            const nextId =
              this.state.current < this.panels.length - 1
                ? this.state.current + 1
                : 0;
            this.setState({ current: nextId });
          },
          30));
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const panelItems =
      this.panels.map((x, i) =>
        <Panel
          key={i}
          id={i}
          column={x.column}
          row={x.row}
          current={this.state.current} />);
    return (
      <div className="grid">
        {panelItems}
      </div>
    );
  }
}

