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

  async load(itemsPerPage = 10, page = 1, fields = 'items(_id, title, price)') {
    const response = await fetch(
      `/api/v1/articles?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}&fields=${fields}`
    );
    const json = await response.json();

    const oldState = this.getState();
    this.setState({
      ...oldState,
      list: json.result.items,
      totalCount: json.result.count ? json.result.count : oldState.totalCount,
      currentPage: page
    }, 'Загружены товары из АПИ');
  }

  async loadArticleById(id, fields = '*,madeIn(title,code),category(title)') {
    const result = await this.getArticleById(id, fields);

    this.setState({
      ...this.getState(),
      activeArticle: result
    }, 'Загружен товар по id из АПИ')
  }

  async getArticleById(id, fields = '*,madeIn(title,code),category(title)') {
    const response = await fetch(`/api/v1/articles/${id}?fields=${fields}`);
    const json = await response.json();

    return json.result;
  }
}

export default Catalog;
