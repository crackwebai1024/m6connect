<template>
    <div>
        <v-btn :color="btnButton" icon @click="pickFile" >
            <slot></slot>
        </v-btn>
        <input
            id="uploadCaptureInputFile"
            ref="obj"
            style="display: none"
            type="file"
            @change="onFilePicked"
        >
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import Compressor from 'compressorjs';

export default {
    name: "M6Upload",
    props: {
        btnButton: {
            type: String,
            default: ""
        }
    },
    methods: {
        ...mapActions('File', {
            getPresignedUrl: 'getPresignedUrl'
        }),
        pickFile() {
            this.$refs.obj.click()
        },
        async onFilePicked(e) {
            const files = e.target.files

            if (files[0] !== undefined) {
                this.$emit('loading')
                for (let x = 0; x < files.length; x++) {
                    await this.prepareUpload(files[x])
                }
                // this.$emit('loading')
            }
        },
        prepareUpload(obj) {
            return new Promise(async (resolve, reject) => {
                try {
                    const fileTypePartial = obj.type.split('/')[0]
                    const data = {
                        folder: fileTypePartial,
                        fileType: obj.type,
                        fileName: obj.name
                    }

                    const response = await axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/file/upload`, data)
                    const url = response.data.url

                    let objectUploaded = null

                    if( fileTypePartial === 'image' ) {
                        const processedFile = await this.imageProcessing(obj)
                        objectUploaded = await this.uploadingFile(url, processedFile)
                    } else {
                        objectUploaded = await this.uploadingFile(url, obj)
                    }
                    
                    await this.processFetch(objectUploaded, false)

                    const objUrl = this.getUrlForObj(url)

                    const resPayload = { ok: true, data: { link: objUrl, fileType: obj.type } }
                    resolve(resPayload)
                    this.$emit('response', resPayload)
                } catch (e) {
                    const err = { ok: false, err: e }
                    this.$emit('response', err)
                    reject(err)
                }
            })
        },
        uploadingFile(url, obj) {
            return new Promise( (resolve, reject) => {
                const newHeaders = new Headers()
                newHeaders.append('x-amz-acl', 'public-read');
                newHeaders.append('Content-Type', obj.type);
                fetch(url, {
                    method: 'PUT',
                    mode: 'cors',
                    body: obj,
                    headers: newHeaders
                })
                .then(res => resolve(res))
                .catch(err => reject(err))
            })
        },
        processFetch(responseFetch, returnJson = true) {
            return new Promise((resolve, reject) => {
                if (responseFetch.ok && returnJson ) {
                    responseFetch.json().then(res => {
                        resolve(res)
                    })
                } else if( responseFetch.ok ) {
                    resolve()
                } else {
                    responseFetch.json().then(err => {
                        reject(err)
                    })
                }
            })
        },

        getUrlForObj(url){
            return url.split("?")[0]
        },

        imageProcessing(file) {
            return new Promise( (resolve, reject) => {
                new Compressor(file, {
                    quality: 0.6,
                    success(result) {
                        resolve(result)
                    },
                    error(err) {
                        reject(err)
                    },
                })
            })
        },

    },
}
</script>