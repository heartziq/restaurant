import styled from "styled-components";

import SingleRestaurant from './SingleRestaurant';

const CollectionCard = styled.div`
.collection.with-header .collection-header {
    background-color: #d35400;
    color: #fff;
  }
  i {
    color: #d63031;
  }
`;

export default () => (
  <CollectionCard className="col s3">
    <ul className="collection with-header">
      <li className="collection-header">
        <h4>Meat Lover</h4>
      </li>
      <SingleRestaurant />
      <SingleRestaurant />
      <SingleRestaurant />
    </ul>
  </CollectionCard>
);
