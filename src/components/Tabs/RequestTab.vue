<template>
    <v-container>
        <header-component :info="{height:'100px', title:'Requests'}">
            <v-spacer></v-spacer>
            <v-col cols="4" >
                <v-text-field
                label="Search"
                v-model="searchText"
                single-line
                outlined
                ></v-text-field>
            </v-col>
        </header-component>
    </v-container>
</template>
<script>
import HeaderComponent from "@/components/Home/HeaderComponent";

export default {
    name: "RequestTab",
    components:{
        HeaderComponent
    },
    data: () => ({
        searchText:''
    }),
}
</script>