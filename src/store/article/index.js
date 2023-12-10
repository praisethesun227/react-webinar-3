import StoreModule from "../module";

class Article extends StoreModule {

  initState() {
    return {
      activeArticle: {}
    }
  }

  async loadArticle(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      activeArticle: json.result
    }, 'Загружен товар по id из АПИ')
  }
}

export default Article;
