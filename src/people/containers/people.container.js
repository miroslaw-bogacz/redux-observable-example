import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/people.actions';
import { PersonComponent } from '../components/person.component';
import { SearchComponent } from '../components/search.component';
import { ButtonComponent } from '../components/button.component';

export class People extends Component {
  constructor(props) {
    super(props);
    this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
    this.handleDarkSideOfTheForceClick = this.handleDarkSideOfTheForceClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPeopleList('');
  }

  handleSearchOnChange(text) {
    this.props.fetchPeopleList(text);
  }

  handleDarkSideOfTheForceClick(text) {
    this.props.fetchDarkSideOfTheForcePeople(text);
  }

  render() {
    return (
      <div>
        <SearchComponent onChange={this.handleSearchOnChange}/>
        <ButtonComponent onChange={this.handleDarkSideOfTheForceClick} />

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
          <tbody data-testid="people-collection">
            {this.props.list.map((item) => (
              <PersonComponent key={item.name} person={item} />
            ))}
          </tbody>
        </table>

        {this.props.isPending && <span data-testid="pending-text">is pending</span>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.peopleList.models,
  isPending: state.peopleList.isPending,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  { fetchPeopleList: Actions.fetchPeopleList, fetchDarkSideOfTheForcePeople: Actions.fetchDarkSideOfTheForcePeople },
  dispatch
);

export const PeopleContainer = connect(mapStateToProps, mapDispatchToProps)(People);
