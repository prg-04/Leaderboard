class Store {
  constructor(key) {
    this.key = key;
  }

  getItems() {
    const item = localStorage.getItem(this.key);
    if (item === null || item === '') {
      return [];
    }
    try {
      return JSON.parse(item);
    } catch (e) {
      return [];
    }
  }

  setItems(items) {
    const itemsJson = JSON.stringify(items);
    localStorage.setItem(this.key, itemsJson);
  }
}

export default Store;
