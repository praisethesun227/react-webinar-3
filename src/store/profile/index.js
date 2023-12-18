import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    return {
      userdata: {},
      waiting: false
    }
  }

  async loadUserData() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Установлено состояние ожидания данных профиля')

    const token = localStorage.getItem('token');
    const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'X-Token': token},
    }

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {...params});
      const json = await response.json();

      this.setState({
        ...this.getState(),
        userdata: json.result,
        waiting: false
      }, 'Загружены данные профиля')
    }

    catch (e) {
      console.log(`Ошибка загрузки профиля: ${e.message}`);
      this.setState({
        ...this.getState(),
        userdata: {},
        waiting: false
      })
    }
  }
}

export default ProfileState;
