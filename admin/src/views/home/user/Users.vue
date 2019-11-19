<template>
  <div class="organization-users">
    <Helmet>
      <title>Users</title>
    </Helmet>
    <div class="container">
      <div class="row">
        <div class="col">
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Add user
          </button>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Modal title
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                  eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <th scope="row">{{ user.id }}</th>
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>
                  <router-link
                    :to="{ name: 'user', params: { username: user.username } }"
                    :key="user.id"
                    class="btn btn-primary"
                    >Edit</router-link
                  >
                  <router-link
                    :to="{ name: 'user', params: { username: user.username } }"
                    :key="user.id"
                    class="btn btn-danger"
                    >Delete</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <div class="list-group">
            <router-link
              v-for="user in users"
              :to="{ name: 'user', params: { username: user.username } }"
              :key="user.id"
              class="list-group-item list-group-item-action"
              >{{ user.firstName }} {{ user.lastName }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import userService from '@/services/user.service';
// @ts-ignore
import { Helmet } from '@jnields/vue-helmet';

export default Vue.extend({
  name: 'users',
  components: { Helmet },
  data() {
    return {
      users: [] as Object[],
    };
  },
  async beforeMount() {
    try {
      this.users = await userService.getAll();
    } catch (e) {
      // console.log(e);
    }
  },
});
</script>

<style lang="scss"></style>
