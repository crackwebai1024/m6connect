<template>
    <div class="panel-people pa-5 vertical-scroll dont-show-scroll h-full">
        <department-chat 
            :key="'department-' + index" 
            v-for="(department, index) in departments" 
            :department="department" 
            :lastDepartment=" index !== departments.length - 1 ? true : false "
        />
    </div>
</template>

<script>
import DepartmentChat from './DepartmentChat'

export default {
    components: {
        DepartmentChat,
    },
    name: 'm6-chat',
    data: () => ({
        departments: [
            {
                name: "My Connections",
                users: [
                    {
                        id: 1,
                        name: "John Doe",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 2,
                        name: "Example User",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 3,
                        name: "Another Example",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    },
                                        {
                        id: 4,
                        name: "John",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 5,
                        name: "Example User 2",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 6,
                        name: "Another Example 2",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    }
                ]
            },
            {
                name: "People in my Company",
                users: [
                    {
                        id: 7,
                        name: "John Doe",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 8,
                        name: "John Doe xyz",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 9,
                        name: "John Doe 9875",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    }
                ]
            },
            {
                name: "People in Vendors",
                users: [
                    {
                        id: 10,
                        name: "John Doe 4321",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 11,
                        name: "John Doe 1234",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    }
                ]
            }        
        ],
    }),
}
</script>

<style lang="scss" scoped>
.panel-people {
    width: 400px;
}
</style>