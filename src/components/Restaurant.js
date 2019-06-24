import styled from "styled-components";

// date helper
import { getDayFromNumber } from "../../data/driver";
import { getFormattedDays } from '../../test';

const RestaurantStyle = styled.div`
  .restaurant_img {
    height: 180px;
    max-width: 100%;
    max-height: 80%;
  }
  .card-title {
    color: #fff;
    font-weight: 500;
  }
  .details {
    font-size: 13px;
    color: #7f8c8d;
    font-weight: 500;

    i.material-icons {
      font-size: 15px;
    }
  }
  .row {
    margin-bottom: 2px;
  }
  .card-content {
    padding: 10px;
    padding-left: 15px;
  }

  .spread {
    display: flex;
    justify-content: space-between;

    .time {
      margin-left: auto;
    }
  }
`;

const displayDetails = openList => {
  return openList.open.map(eachOpen => (
    <div className="row spread">
      <div className="day">
        <i className="material-icons">calendar_today</i>
        <span>{getFormattedDays(getDayFromNumber(...eachOpen.day))}</span>
      </div>
      <div className="time">
        <i className="material-icons">access_time</i>{eachOpen.time.openAt} - {eachOpen.time.closeAt}
      </div>
    </div>
  ));
};

export default c => (
  <div className="col s12 m3">
    <RestaurantStyle className="card">
      <div className="card-image">
        {/* <img src="https://via.placeholder.com/300x200.png" /> */}
        <img className="restaurant_img" src="/static/1.jpg" alt="my image" />
        <span className="card-title">{c.name}</span>
        <a className="btn-floating halfway-fab waves-effect waves-light red">
          <i className="material-icons">add</i>
        </a>
      </div>
      <div className="card-content">
        <div className="details">
            {displayDetails(c)}
        </div>
      </div>
    </RestaurantStyle>
  </div>
);
