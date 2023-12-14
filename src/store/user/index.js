import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      authorized: false,
      username: null,
      errorMessage: null,
      userdata: {},
      waiting: false
    }
  }

  async initAuth() {
    if (!this.checkAuth())
      return;

    await this.loadUserData();
  }

  checkAuth() {
    return !!localStorage.getItem('token');
  }

  async logoff() {
    const token = localStorage.getItem('token');
    const params = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', 'X-Token': token},
    }

    await fetch('/api/v1/users/sign', params);
    localStorage.removeItem('token');

    this.setState({
      ...this.initState()
    })
  }

  async loadUserData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    this.setState({
      ...this.getState(),
      waiting: true
    })

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
        authorized: true,
        username: json.result.profile.name,
        waiting: false
      }, 'Загрузка данных пользователя')
    }

    catch (error) {
      console.log(error);
      this.setState({
        ...this.getState(),
        waiting: false,
        userdata: {}
      })
    }
  }

  async auth(login, password) {
    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({login, password}),
    }

    try {
      const response = await fetch('/api/v1/users/sign', {...params});
      const json = await response.json();
      const token = json.result?.token;
      const username = json.result?.user?.profile?.name;

      if (!token) {
        if (json.error) {
          this.setState({
            ...this.initState(),
            errorMessage: json.error.data.issues.message || json.error.message
          }, 'Установка состояния ошибки')
        }

        else {
          this.setState({
            ...this.initState(),
            errorMessage: 'Unknown error'
          }, 'Установка состояния ошибки')
        }

        return;
      }

      localStorage.setItem('token', token);
      this.setState({
        ...this.getState(),
        authorized: true,
        username: username,
        errorMessage: null
      }, 'Установка состояния авторизации')
    }

    catch (error) {
      this.setState({
        ...this.initState(),
        errorMessage: error.message || 'Unknown error'
      }, 'Установка состояния ошибки')
    }
  }

}

export default UserState;
