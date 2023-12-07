import StoreModule from "../module";

class Location extends StoreModule {

  initState() {
    return {
      locationName: 'Магазин'
    }
  }

  setLocation(locationName) {
    this.setState({locationName});
  }
}

export default Location;
