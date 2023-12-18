import StoreModule from "../module";

class CategoriesState extends StoreModule {

  initState() {
    return {
      categoriesList: [],
      waiting: false
    }
  }

  async loadCategories() {
    this.setState({
      ...this.getState(),
      waiting: true
    })

    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      categoriesList: json.result.items,
      waiting: false
    }, 'Загружен список категорий')
  }
}

export default CategoriesState;
