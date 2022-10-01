const app = Vue.createApp({
  data() {
    return {
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      phone: '01-7654-9999',
      gender: 'male',
      photo: 'https://randomuser.me/api/portraits/men/22.jpg',
    };
  },
  methods: {
    async getUser() {
      const res = await fetch('https://randomuser.me/api');
      const { results } = await res.json();

      if (results.length) {
        // Access any data using the 'this' keyword.
        this.title = results[0].name.title;
        this.firstName = results[0].name.first;
        this.lastName = results[0].name.last;
        this.email = results[0].email;
        this.phone = results[0].phone;
        this.gender = results[0].gender;
        this.photo = results[0].picture.large;
      }
    },
  },
});

app.mount('#app');
