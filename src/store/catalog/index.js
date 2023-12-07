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
      totalCount: 0,
      currentPage: 1,
      activeArticle: {}
    }
  }

  async load(limit = 10, skip = 0, fields = 'items(_id, title, price)') {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=${fields}`);
    const json = await response.json();

    const oldState = this.getState();
    this.setState({
      ...oldState,
      list: json.result.items,
      totalCount: json.result.count ? json.result.count : oldState.totalCount,
      currentPage: Math.ceil(skip / limit) + 1
    }, 'Загружены товары из АПИ');
  }

  async loadArticle(id, fields = '*,madeIn(title,code),category(title)') {
    const result = await this.getArticle(id, fields);

    this.setState({
      ...this.getState(),
      activeArticle: result
    }, 'Загружен товар по id из АПИ')
  }

  async getArticle(id, fields = '*,madeIn(title,code),category(title)') {
    const response = await fetch(`/api/v1/articles/${id}?fields=${fields}`);
    const json = await response.json();

    return json.result;
  }
}

export default Catalog;
