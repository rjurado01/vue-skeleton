import template from './index.pug';

export default Vue.extend({
  template: template(),
  data() {
    return {
      users: []
    };
  },
  created() {
    this.users.push({name: 'user1', email: 'user1@email.com'});
    this.users.push({name: 'user2', email: 'user2@email.com'});
  }
});
