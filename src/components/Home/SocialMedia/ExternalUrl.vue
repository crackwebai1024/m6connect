<template>
    <v-container>
        <div 
            v-for="(url, index) of localUrls"
            :key="index + '-exerna-url'"
            class="py-0 my-0 px-5"
        >
            <p class="pointer" @click="redirect(url['href'])" >
                <v-img
                    width="20"
                    height="20"
                    class="rounded d-inline-block"
                    style="vertical-align: middle;"
                    :src="url['imageUrl']"
                />
                <span 
                    style="vertical-align: middle;"
                    class="d-inline-block ml-2 text-subtitle-1 font-weight-bold blue--text"
                >
                    {{ url['host'] }}
                </span>
            </p>
            <v-row
                @click="redirect(url['href'])"
                no-gutters
                class="pl-5 mx-2 py-0 my-0 pointer text-left"
                style="borderLeft: thick solid rgb(238 238 238);"
                align="center"
            >
                <v-col cols="12" class="py-4">
                    {{url['description']}}
                </v-col>
                <v-col cols="12">
                    <v-img
                        width="100"
                        height="100"
                        class="rounded"
                        :src="url['imageUrl']"
                    />
                </v-col>
            </v-row>
        </div>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
    name: 'ExternalUrl',
    data: () => ({
        localUrls: []
    }),
    props: {
        urls: {
            type: Array,
            default: []
        }
    },
    methods: {
        ...mapActions("SocialNetworkModule", {
            getDescription: "get_url_description"
        }),
        redirect(url){
            window.open(url,'_blank')
        }
    },
    mounted() {
        this.urls.forEach( async url => {
            let res = new URL(url);
            
            res['imageUrl'] = `https://logo.clearbit.com/${res['origin']}`
            res['description'] = await this.getDescription({url: res['origin']})
            
            this.localUrls.push(res);
        });
    }
}
</script>