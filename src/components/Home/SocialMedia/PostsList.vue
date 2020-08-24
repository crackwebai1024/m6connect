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
                {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
            ],
            reactions: {
                likes: 100,
                enchants: 23,
                unlikes: 21
            },
            comments:[{
                name: "Eduarfo Ramirez",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg",
                message: "In duis ea irure et magna quis commodo sunt enim fugiat anim eu. Consequat ex eu eiusmod culpa tempor officia aute excepteur ex consequat esse occaecat nostrud. Aliqua irure eiusmod duis occaecat consectetur aute officia in incididunt ut exercitation do. Eiusmod irure tempor reprehenderit do minim nostrud proident reprehenderit. Irure aute do proident duis Lorem tempor. Nisi sit eiusmod duis qui elit voluptate tempor aute.",
                reactions: {
                    likes: 17,
                    enchants: 21,
                    unlikes: 6
                },  
            }]
        }
    })
}
</script>