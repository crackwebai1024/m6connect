<template>
  <v-container>
    <v-layout
      class="text-xs-center"
      column
    >
      <v-flex>
        <h1>403</h1>
      </v-flex>

      <v-flex>
        <h2 v-text="'Forbidden'" />
      </v-flex>

      <v-flex>
        <span v-text="'The user might not have the necessary permissions for a resource.'" />
      </v-flex>

      <v-flex>
        <p>
          <a
            href=""
            @click.prevent="$router.back"
            v-text="'« Go Back'"
          />
          /
          <a
            href=""
            @click.prevent="$router.replace({ name: 'dashboard' })"
            v-text="'Go Dashboard »'"
          />
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Error403'
}
</script>
