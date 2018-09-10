import * as React from 'react';

export class SearchComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    const search = event.currentTarget.value;
    this.setState({ search });
    this.props.onChange(search);
  }

  render() {
    return (
      <input onChange={this.handleSearchChange} placeholder="find by name" />
    );
  }
}


