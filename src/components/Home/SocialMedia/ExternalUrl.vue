<template>
    <v-container>
        <div 
            v-for="(url, index) of urls"
            :key="index + '-exerna-url'"
            class="py-0 my-0 px-5" 
        >
            <p
                class="pointer text-subtitle-1 font-weight-bold blue--text"
                @click="redirect(url)"
            >
                {{ url }}
            </p>
        </div>
    </v-container>
  </div>
</template>
<script>
export default {
    name: 'ExternalUrl',
    props: {
        urls: {
            type: Array,
            default: []
        }
    },
    methods: {
        redirect(url){
            // window.open(url,'_blank')
            let res = this.parseURLParams(url);
            
        },
        async parseURLParams(getUrl) {
            try {
                fetch(getUrl).then(response => {
                    console.log(response)
                    console.log(response.headers.keys())
                });
            } catch (err) {
            console.log(err);
            };
        }
    }
}
</script>