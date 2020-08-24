<template>
<v-container>
    <header-component hasslot :info="{title:'Create Post', icon:''}">
      <template v-slot:select>
        <v-select
            :items="items"
            label="Solo field"
            dense
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
    <h2>aloo</h2>
</v-container>
</template>
<script>
import HeaderComponent from "@/components/Home/HeaderComponent"

export default {
    name: "SocialMedia",
    components:{
        HeaderComponent
    },
    data: () => ({
        searchText:'',
        items:['Foo', 'Bar', 'Fizz', 'Buzz']
    })
}
</script>
