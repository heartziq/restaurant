import styled from "styled-components";
import * as api from "../api";
import { observer } from "mobx-react";

import SingleRestaurant from "./SingleRestaurant";


import DateOps from "../../data";

const myStore = new DateOps();

const CollectionCard = styled.div`
  .collection.with-header .collection-header {
    background-color: #d35400;
    color: #fff;
  }
  i {
    color: #d63031;
  }
`;

@observer
class SingleCollection extends React.Component {


  componentDidMount() {
    myStore.fetchCollection(this.props.name, this.props.restaurant);
    
  }

  renderRestaurantList() {
    return myStore.collection[this.props.name] ? myStore.collection[this.props.name].map(e => <SingleRestaurant {...e} />) : <h3>Fetching data...</h3>
  }

  render() {
    console.log(`myStore.collection:${JSON.stringify(myStore.collection)}`)
    return (
      <CollectionCard className="col s3">
        <ul className="collection with-header">
          <li className="collection-header">
            <h4>{this.props.name}</h4>
          </li>
          {this.renderRestaurantList()}
          {/* <SingleRestaurant {...oneRestaurant}/> */}
        </ul>
      </CollectionCard>
    );
  }
}


export default SingleCollection;