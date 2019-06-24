import styled from "styled-components";

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

export default () => (
  <EachRestaurant className="collection-item">
    <h5>Mom's Bakery</h5>
    <a href="#!" class="secondary-content">
      <i className="material-icons">cancel</i>
    </a>
    <div className="details">
      <i className="material-icons">calendar_today</i> Mon-Thu
      <i className="material-icons">access_time</i> 12:30 pm - 1:00 pm
      <br />
      <i className="material-icons">calendar_today</i> Fri-Sun
      <i className="material-icons">access_time</i> 1:30 pm - 7:00 pm
      <br />
    </div>
  </EachRestaurant>
);
