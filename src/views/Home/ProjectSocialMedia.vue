<template>
<v-container>
    <header-component class="mb-4" hasslot :info="{title:'Create Post', icon:''}">
      <template v-slot:select>
        <v-select
            :items="items"
            label="Everyone"
            v-model="item"
            @change = "filter_posts([item, 1])"
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
            flat
            dense
            @keyup.enter="filter_posts(['author', 1])"
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
import {mapActions} from "vuex";

export default {
    name: "SocialMedia",
    components:{
        HeaderComponent,
        PostsList
    },
    data: () => ({
        searchText:'',
        // items:['Everyone', 'My Company', 'All My Teams', 'IT Team XY', 'CPM TeamZ', 'All My Departments', 'Finances', 'Operations'],
        items:[
            {
                text: "Everyone",
                value: "Everyone"
            },{
                text: "My posts",
                value: "author"
            },{
                text: "My Company",
                value: "company"
            }
        ],
        item:"Everyone",
        posts_list:[{}]
    }),
    methods:{
        ...mapActions("SocialNetworkModule",["filter_posts"]),
    }
}
</script>
