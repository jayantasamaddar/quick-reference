const columns = [
  { field: 'order', name: 'Order', width: 90 },
  { field: 'date', name: 'Date', width: 160 },
  { field: 'customer', name: 'Customer', type: 'number', width: 110 },
  { field: 'total', name: 'Total', width: 90 },
  { field: 'items', name: 'Items', type: 'number', width: 100 },
  { field: 'delivery_method', name: 'Delivery Method', width: 160 },
  { field: 'payment_status', name: 'Payment Status', type: 'string', width: 160 },
  { field: 'fulfillment_status', name: 'Fulfillment Status', type: 'string', width: 160 },
  { field: 'return_status', name: 'Return Status', width: 160 },
  { field: 'tags', name: 'Tags', type: 'array', width: 90 },
];

const rows = [
  { id: 1, order: 1234, date: "Wednesday at 02:25 AM", customer: 'Jon Snow', total: "828.00", items: 1, fulfillment_status: "Unfulfilled", payment_status: "Pending", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 2, order: 5678, date: "2 Feb at 2:40 AM", customer: 'Cersei Lannister', total: "828.00", items: 1, fulfillment_status: "Fulfilled", payment_status: "Paid", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 3, order: 41415262, date: "3 Jan at 9:38 PM", customer: 'Jaime Lannister', total: "5904.95", items: 3, fulfillment_status: "Cancelled", payment_status: "Pending", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 4, order: 51515363, date: "2 Jan at 1:04 PM", customer: 'Arya Stark', total: "1598.00", items: 1, fulfillment_status: "Unfulfilled", payment_status: "Paid", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 5, order: 55535, date: "25 Dec at 12:17 AM", customer: 'Daenerys Targaryen', total: "3653.30", items: 2, fulfillment_status: "Fulfilled", payment_status: "Paid", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 6, order: 858685, date: "14 Nov at 08:50 PM", customer: 'Melisandre', total: "1499.00", items: 1, fulfillment_status: "Cancelled", payment_status: "Pending", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 7, order: 45235, date: "12 Nov at 11:50 PM", customer: 'Harry Potter', total: "1899.00", items: 1, fulfillment_status: "Fulfilled", payment_status: "Pending", return_status: "Returned", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 8, order: 7885784, date: "3 Nov at 10:18 PM", customer: 'Severus Snape', total: "1399.00", items: 1, fulfillment_status: "Cancelled", payment_status: "Pending", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 9, order: 95151, date: "3 Nov at 9:25 PM", customer: 'Albus Dumbledore', total: "2599.00", items: 1, fulfillment_status: "Fulfilled", payment_status: "Paid", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 10, order: 1234, date: "Wednesday at 02:25 AM", customer: 'Jon Snow', total: "828.00", items: 1, fulfillment_status: "Unfulfilled", payment_status: "Pending", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 11, order: 5678, date: "2 Feb at 2:40 AM", customer: 'Cersei Lannister', total: "828.00", items: 1, fulfillment_status: "Fulfilled", payment_status: "Paid", return_status: "Returned", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 12, order: 41415262, date: "3 Jan at 9:38 PM", customer: 'Jaime Lannister', total: "5904.95", items: 3, fulfillment_status: "Cancelled", payment_status: "Pending", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 13, order: 51515363, date: "2 Jan at 1:04 PM", customer: 'Arya Stark', total: "1598.00", items: 1, fulfillment_status: "Unfulfilled", payment_status: "Paid", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 14, order: 55535, date: "25 Dec at 12:17 AM", customer: 'Daenerys Targaryen', total: "3653.30", items: 2, fulfillment_status: "Fulfilled", payment_status: "Paid", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 15, order: 858685, date: "14 Nov at 08:50 PM", customer: 'Melisandre', total: "1499.00", items: 1, fulfillment_status: "Cancelled", payment_status: "Pending", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 16, order: 45235, date: "12 Nov at 11:50 PM", customer: 'Ferrara Clifford', total: "1899.00", items: 1, fulfillment_status: "Fulfilled", payment_status: "Paid", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 17, order: 7885784, date: "3 Nov at 10:18 PM", customer: 'Rossini Frances', total: "1399.00", items: 1, fulfillment_status: "Cancelled", payment_status: "Paid", return_status: "Return in Progress", delivery_method: 'Free Shipping (3-7 Business Days)' },
  { id: 18, order: 95151, date: "3 Nov at 9:25 PM", customer: 'Harvey Roxie', total: "2599.00", items: 1, fulfillment_status: "Fulfilled", payment_status: "Pending", return_status: "Returned", delivery_method: 'Free Shipping (3-7 Business Days)' },
];

const views = [
  { index: 0, name: "all", title: "All", filters: [], default: true },
  { index: 1,
    name: "unfulfilled",
    title: "Unfulfilled", 
    filters: [
      {fulfillment_status: "Unfulfilled"}
    ]
  },
  { 
    index: 2, 
    name: "cancelled",
    title: "Cancelled", 
    filters: [
      {fulfillment_status: "Cancelled"}
    ]
  },
  { 
    index: 3, 
    name: "pending",
    title: "Pending", 
    filters: [
      {payment_status: "Pending"}
    ]
  },
  { 
    index: 4, 
    name: "paid",
    title: "Paid", 
    filters: [
      {payment_status: "Paid"}
    ]
  },
  { 
    index: 5, 
    name: "completed",
    title: "Completed", 
    filters: [
      {payment_status: "Paid"},
      {fulfillment_status: "Fulfilled"}
    ]
  },
  { 
    index: 6, 
    name: "returned",
    title: "Returned", 
    filters: [
      {payment_status: "Pending"},
      {return_status: "Returned"}
    ]
  }
]

const { filters } = views[6];

/* Filter Conditions - All conditions have to be true */
/* Using C-Style for Loop */
const multipassFilter = (dataArray, filters) => {
const arr = [...dataArray];
for(let i = 0; i < filters.length; i++) {
  const key = Object.keys(filters[i])[0];
  arr.push(...arr.splice(0, arr.length).filter(e => e[key] === filters[i][key]))
}
return arr;
}
console.log(multipassFilter(rows, filters));

/* Using forEach Loop */
const multipassFilter2 = (dataArray, filters) => {
const arr = [...dataArray];
filters.forEach((f, i) => {
  const key = Object.keys(f)[0];
  arr.push(...arr.splice(0, arr.length).filter(e => e[key] === f[key]))
});
return arr;
}
console.log(multipassFilter2(rows, filters));