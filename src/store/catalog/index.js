import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      totalCount: 0
    }
  }

  async load(limit = 10, skip = 0, fields = 'items(_id, title, price)') {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=${fields}`);
    const json = await response.json();

    const oldState = this.getState();
    this.setState({
      ...oldState,
      list: json.result.items,
      totalCount: json.result.count ? json.result.count : oldState.totalCount
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
