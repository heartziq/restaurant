import styled from "styled-components";

// date helper
import { getDayFromNumber } from "../../data/driver";
import { getFormattedDays } from '../../test';

const EachRestaurant = styled.li`
  .details {
    font-size: 10px;
    color: #7f8c8d;
    font-weight: 500;

    i.material-icons {
      font-size: 10px;
    }
  }
`;

const displayDetails = openList => {
  return openList.open.map(eachOpen => (
    <div className="row">
      <i className="material-icons">calendar_today</i>
      <span>{getFormattedDays(getDayFromNumber(...eachOpen.day))}</span>
      <i className="material-icons">access_time</i>{eachOpen.time.openAt} - {eachOpen.time.closeAt}
      <br />
    </div>
  ));
};

export default (oneRestaurant) => {

  console.log(`SingleRestaurant.c -> ${JSON.stringify(oneRestaurant)}`)

  return (
    <EachRestaurant className="collection-item">
      <h5>{oneRestaurant.name}</h5>
      <a href="#!" class="secondary-content">
        <i className="material-icons">cancel</i>
      </a>
      <div className="details">
        {/* { displayDetails(oneRestaurant) } */}
      </div>
    </EachRestaurant>
  )
}