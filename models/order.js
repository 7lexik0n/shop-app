import moment from "moment";

class Order {
  constructor(id, cartItems, amount, date) {
    this.id = id;
    this.cartItems = cartItems;
    this.amount = amount;
    this.date = date;
  }

  get readableDate() {
    return moment(this.date).format("MMMM Do YYYY, hh:mm");
  }
}

export default Order;
