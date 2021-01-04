import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  let sut;
  let mockDeals;
  beforeEach(() => {
    mockDeals = mockData.deals;
    // Arrange
    sut = new Store();
    sut.setDeals(deals);
  });
  it("should return all deals when no filters applied", () => {
    // Act
    const result = sut.deals;

    // Assert
    expect(result).toEqual(mockData.deals);
  });

  it("show the broadband only deals when broadband filter applied", () => {
    // Act
    sut.setProductFilter("broadband");
    const matchedDeals = sut.deals;
    const matchedDealsWithoutFilter = matchedDeals.filter((deal) => {
      const payload =
        deal.productTypes.includes("Broadband") ||
        deal.productTypes.includes("Fibre Broadband");
      return !payload;
    });

    // Assert
    expect(matchedDeals).toHaveLength(4);
    expect(matchedDealsWithoutFilter.length).toBeFalsy();
  });

  it("should return the deals for broadband and tv only when broadband and tv filters applied", () => {
    // Act
    sut.setProductFilter("broadband");
    const matchedDeals = sut.deals;
    const matchedDealsWithoutFilter = matchedDeals.filter((deal) => {
      const payload =
        (deal.productTypes.includes("Broadband") ||
          deal.productTypes.includes("Fibre BroadBand")) &&
        deal.productTypes.includes("TV");
      return !payload;
    });

    // Assert
    expect(matchedDeals).toHaveLength(4);
    expect(matchedDealsWithoutFilter.length).toBeFalsy();
  });
  it("should return the deals for broadband and mobile only when broadband and mobile filters applied", () => {
    // Act
    sut.setProductFilter("broadband");
    const matchedDeals = sut.deals;
    const matchedDealsWithoutFilter = matchedDeals.filter((deal) => {
      const payload =
        (deal.productTypes.includes("Broadband") ||
          deal.productTypes.includes("Fibre BroadBand")) &&
        deal.productTypes.includes("Mobile");
      return !payload;
    });

    // Assert
    expect(matchedDeals).toHaveLength(1);
    expect(matchedDealsWithoutFilter.length).toBeFalsy();
  });
  it("should return the deal for Sky only when Sky filter applied", () => {
    // Act
    sut.setProductFilter("broadband");
    const matchedDeals = sut.deals;
    const matchedDealsWithoutFilter = matchedDeals.filter((deal) => {
      const payload = deal.provider.name === "Sky";
      return !payload;
    });

    // Assert
    expect(matchedDeals).toHaveLength(1);
    expect(matchedDealsWithoutFilter.length).toBeFalsy();
  });
  it("should return the deals for BT with broadband and tv only when BT, broadband, and tv filters applied", () => {
    // Act
    sut.setProductFilter("broadband");
    const matchedDeals = sut.deals;
    const matchedDealsWithoutFilter = matchedDeals.filter((deal) => {
      const payload =
        (deal.productTypes.includes("Broadband") ||
          deal.productTypes.includes("Fibre BroadBand")) &&
        deal.productTypes.includes("TV") &&
        deal.provider.name === "BT";
      return !payload;
    });

    // Assert
    expect(matchedDeals).toHaveLength(2);
    expect(matchedDealsWithoutFilter.length).toBeFalsy();
  });
});
