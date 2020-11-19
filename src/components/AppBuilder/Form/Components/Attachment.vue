<template>
<v-container>
    <v-card class="d-flex flex-column" v-if="!edit" >
        <v-card-title class="my-0 py-0">
            <span class="pointer" @click="openFile">
                {{file['file_name']}}
            </span>
            <v-spacer></v-spacer>
            <v-btn icon @click="edit = !edit">
                <v-icon color="primary" >mdi-pencil</v-icon>
            </v-btn>
        </v-card-title>
    </v-card>
    
    <div v-else>
        <v-file-input
            @change="selectFile"
            :label="label"
            filled
            prepend-icon="mdi-file-document-outline"
            append-outer-icon="mdi-cancel"
            @click:append-outer="edit = !edit"
            counter
            outlined
            dense
            show-size
            truncate-length="20"
        />
    </div>
</v-container>
</template>

<script>
import axios from 'axios'
import { mapActions } from "vuex";

export default {
    name:"AppAttachment",
    props: {
        value:     { type: Object,  default: ()=>{}},
        label:     { type: String,  default: ""    },
        filled:    { type: Boolean, default: false },
        multiple:  { type: Boolean, default: false },
        chips:     { type: Boolean, default: false },
        clearable: { type: Boolean, default: false }
    },
    data: () => ({
        edit: false,
    }),
    computed: {
        file: {
            get() {
                return this.value || {}
            },
            set(data) {
                this.$emit('input', data)
            }
        },
    },
    methods: {
        ...mapActions("AppAttachments", {
            setApp: "post_attachment"
        }),
        openFile(){
            let path = `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/file/app-builder/${this.file.id}`;
            console.log(this.file.id);
            
            window.open(path,'_blank');
            
        },
        selectFile(file) {
            if (file['name'].match(/\.[0-9a-z]+$/i) && file['size'] < 50000000){
                let localFile = {
                    file_type: file['type'],
                    file_extension: file['name'].match(/\.[0-9a-z]+$/i)[0],
                    file_name: file['name'].substring(file['name'][0], file['name'].lastIndexOf(".")),
                    file_name_full: file['name'],
                    file_size: file['size'],
                    file: file
                };
                this.file = {...localFile};

                this.setApp({
                    file: file,
                    headers: {
                        'Content-Type': localFile['file_type'],
                        'Content-Name': localFile['file_name_full']
                    }
                }).then(file => {
                    this.file['value']= file['attachId']
                    this.file['id']= file['attachId']
                })
            }
        },
    }
}
</script>