<template>
    <p>{{info['name']}}</p>
</template>
<script>
export default {
    name:"person",
    props:{
        // Info has name, imageUrl, email and contactPhone
        info : Object
    }
}
</script>