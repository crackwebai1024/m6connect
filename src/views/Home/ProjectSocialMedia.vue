<template>
<v-container>
    <header-component class="mb-4" hasslot :info="{title:'Create Post', icon:''}">
      <template v-slot:select>
        <v-select
            :items="items"
            label="Everyone"
            dense
            flat
            push-tags
            solo
            ></v-select>
      </template>
      <template v-slot:input>
        <v-text-field
            height="37"
            label="Whats on your mind, Manuel"
            rounded
            dense
            v-model="searchText"
            single-line
            hide-details
            solo-inverted
        ></v-text-field>
      </template>
    </header-component>
    <posts-list/>
</v-container>
</template>
<script>
import HeaderComponent from "@/components/Home/HeaderComponent";
import PostsList from "@/components/Home/SocialMedia/PostsList";


export default {
    name: "SocialMedia",
    components:{
        HeaderComponent,
        PostsList
    },
    data: () => ({
        searchText:'',
        items:['Everyone', 'My Company', 'All My Teams', 'IT Team XY', 'CPM TeamZ', 'All My Departments', 'Finances', 'Operations'],
        posts_list:[{}]
    })
}
</script>
