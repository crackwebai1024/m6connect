<template>
<v-container>
    <v-file-input
        @change="selectFile"
        :label="label"
        filled
        prepend-icon="mdi-file-document-outline"
        counter
        outlined
        dense
        show-size
        truncate-length="20"
    />
</v-container>
</template>

<script>
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

                console.log(this.file);
                
            }
        },
    }
}
</script>