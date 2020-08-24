<template>
    <v-container class="px-0 py-0">
        <post-item :data="item"/>
    </v-container>
</template>
<script>
import PostItem from "./PostItem";

export default {
    name: "PostsList",
    components: {
        PostItem
    },
    data: () => ({
        item:{
            contain: "Ad do incididunt reprehenderit enim est laborum. Enim dolore do est eu incididunt. Commodo commodo occaecat tempor magna anim. Minim aute nisi culpa sint est et officia elit. Eiusmod eiusmod cupidatat qui qui mollit et irure nulla eiusmod reprehenderit culpa dolor laboris. Consequat pariatur cillum anim minim.",
            name: "Jose Manuel Valdez Gonzalez",
            imageUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
            occupation: "IT Apps (Department)",
            images:[
                {url:"https://www.pngitem.com/pimgs/m/160-1600311_free-png-download-happy-person-png-images-background.png"},
                {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
            ]
        }
    })
}
</script>