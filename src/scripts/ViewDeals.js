class ViewDeals {
  constructor(store, template) {
    this.store = store;
    this.template = template;
    this.dealList = document.getElementById("deal-list");
  }

  render(data) {
    if (this.dealList && data.length) {
      const htmlToAppend = this.template.buildDealList(data);
      this.dealList.innerHTML = htmlToAppend;
    } else {
      this.dealList.innerHTML = "<h4>No deals found</h4>";
    }
  }

  update(state) {
    this.render(this.store.deals);
  }
}

export default ViewDeals;
