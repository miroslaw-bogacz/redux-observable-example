import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPeopleList } from '../store/people.actions';
import { PersonComponent } from '../components/person.component';
import { SearchComponent } from '../components/search.component';

export class People extends Component {
  constructor(props) {
    super(props);
    this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchPeopleList('');
  }

  handleSearchOnChange(text) {
    this.props.fetchPeopleList(text);
  }

  render() {
    return (
      <div>
        <SearchComponent onChange={this.handleSearchOnChange}/>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Hair color</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map((item) => (
              <PersonComponent key={item.name} person={item} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.peopleList.models,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  { fetchPeopleList },
  dispatch
);

export const PeopleComponent = connect(mapStateToProps, mapDispatchToProps)(People);