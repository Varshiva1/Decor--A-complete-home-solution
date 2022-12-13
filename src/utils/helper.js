export const isInList = (list, id) => {
  return Boolean(list.find((item) => item._id === id))
}

export const priceDetails = (cartItem) => {
  return cartItem.reduce(({ totalqty, price, discount }, curritem) => {
    price += curritem.offprice * curritem.qty;
    totalqty += curritem.qty;
    discount += (curritem.price - curritem.offprice) * curritem.qty;
    return { totalqty, price, discount }

  }, {
    totalqty: 0,
    price: 0,
    discount: 0,
  })
}
export const FilterBysearch = (productList, { searchProduct }) => {
  let updatedList = [...productList];
  if (searchProduct) {
    return updatedList.filter((product) => product.title.toLowerCase().includes(searchProduct.toLowerCase()))
  }
  return updatedList;
}
export const sortByPrice = (productList, { sortByPrice }) => {
  let updatedList = [...productList];
  if (sortByPrice === "HIGH_TO_LOW") {
    return updatedList.sort((a, b) => b["offprice"] - a["offprice"]);
  }
  if (sortByPrice === "LOW_TO_HIGH") {
    return updatedList.sort((a, b) => a["offprice"] - b["offprice"]);
  }
  return updatedList;

}
export const FilterByRating = (productList, { filterByRating }) => {
  let updatedList = [...productList];
  if (filterByRating) {
    return updatedList.filter((product) => Number(product.rating) >= Number(filterByRating))
  }
  return updatedList;
}

export const FilterByPriceSlider = (productList, { priceRange }) => {
  let updatedList = [...productList];
  if (priceRange) {
    return updatedList.filter(
      (products) => parseInt(products.offprice) <= parseInt(priceRange)
    );
  }
  return updatedList;
}
export const FilterByCategory = (productList, { productCategory }) => {
  let updatedList = [...productList];
  if (!productCategory.length) return updatedList;
  return updatedList.filter((product) => {
    return productCategory.includes(product.categoryName.toLowerCase());
  })
}

const filterFunctions = [
  FilterBysearch,
  sortByPrice,
  FilterByRating,
  FilterByCategory,
  FilterByPriceSlider,
];

export const getFilteredProducts = (products, filters) => {
  return filterFunctions.reduce((acc, crr) => {
    return crr(acc, filters);
  }, products);
}
