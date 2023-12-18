import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      authorized: false,
      username: null,
      errorMessage: null,
      initComplete: false
    }
  }

  async initAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({
        ...this.initState(),
        initComplete: true
      })
      return;
    }

    const params = {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'X-Token': token},
    }

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {...params});
      const json = await response.json();

      if (json.error) {
        this.setState({
          ...this.initState(),
          initComplete: true
        })
        return;
      }

      this.setState({
        ...this.getState(),
        authorized: true,
        initComplete: true,
        username: json.result.profile.name
      }, 'Восстановленна сессия')
    }

    catch (e) {
      this.setState({
        ...this.initState(),
        initComplete: true
      })
    }
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
      ...this.initState(),
      initComplete: true
    })
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
            initComplete: true,
            errorMessage: json.error.data?.issues[0]?.message || json.error.message || 'Unknown error'
          }, 'Установка состояния ошибки')
        }

        else {
          this.setState({
            ...this.initState(),
            initComplete: true,
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
        initComplete: true,
        errorMessage: error.message || 'Unknown error'
      }, 'Установка состояния ошибки')
    }
  }

}

export default UserState;
