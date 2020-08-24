<template>
    <v-card>
        <v-card-title>
            <v-row>
                <v-col cols="2">
                    <v-avatar>
                        <img :src=data.imageUrl>
                    </v-avatar>
                </v-col>
                <v-col cols="8">
                    <h2 class="text-md-body-1 font-weight-bold">{{data.name}}</h2>
                    <p class="text-caption"> {{data.occupation}} </p>
                </v-col>
                <v-col cols="2">
                    <v-icon>mdi-close</v-icon>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text>
            <v-row no-gutters>
                <v-col :cols="widthCols()" v-for="(image, index) of data.images" :key="index">
                    <v-img contain :src=image.url class="rounded-lg mx-1 my-1" aspect-ratio="1.7"></v-img>
                </v-col>
            </v-row>
            <v-row>
                <p>{{data.contain}}</p>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="print">
                asdasd
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name:"PostItem",
    props: {
        data: Object
    },
    methods: {
        widthCols(){
            return this.data.images.length === 1 ? 12 : 6;
        },
        print(){
            console.log(this.widthCols());
        }
    }
}
</script>