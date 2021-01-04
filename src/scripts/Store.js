import Observable from "./Observable";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null,
    };
  }

  get deals() {
    const payload = this.filter();
    return payload;
  }

  filter() {
    try {
      const deals = this.state.deals;
      const productFilters = this.state.productFilters;
      const providerFilter = this.state.providerFilter;
      let foo;
      let bar;
      if (productFilters.length) {
        foo = deals.filter((deal) => {
          const productTypes = deal.productTypes.map((t) => t.toLowerCase());
          const payload = productTypes.some(
            (type) => productFilters.indexOf(type) >= 0
          );
          return payload;
        });
      } else {
        foo = deals;
      }
      if (providerFilter) {
        bar = foo.filter((deal) => {
          const payload = deal.provider.id === providerFilter;
          return payload;
        });
      } else {
        bar = foo;
      }
      return bar;
    } catch (error) {
      console.log("error filtering", error);
    }
  }

  setDeals(data) {
    this.state.deals = data;
    this.notify(this.state);
  }

  setProductFilter(value) {
    const filter = value.trim().toLowerCase();
    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }
    this.notify(this.state);
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;
