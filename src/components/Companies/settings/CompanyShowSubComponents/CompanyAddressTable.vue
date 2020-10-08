<template>
    <div class="text-right" >
        <v-btn fab dark x-small color="primary" @click="appendToItems" >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="5"
            class="elevation-0"
        > 
            <!-- <template #item.socialMedia="{ item }" >
                <v-autocomplete
                    v-model="item.icon"
                    :items="socialMediaOptions"
                    item-text="text"
                    item-value="val"
                    @input="e => inputEvent(e, item)"
                />
            </template>
            <template #item.link="{ item }" >
                <v-text-field 
                    v-model="item.link" 
                    :label="`${item.name} Link`" 
                    :rules="websiteRules" 
                />
            </template> -->
            <template #item.actions="" >
                <v-btn fab dark x-small color="yellow" >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn fab dark x-small color="red" >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template> 

        </v-data-table>
    </div>
</template>

<script>
import CompanyAddressCU from './Cruds/CompanyAddressCU'

export default {
    name: "CompanyAddressTable",
    components: {
        CompanyAddressCU
    },
    props: {
        items: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        headers: [
            { text: "Name", value: "name" },
            { text: "Location Type", value: "locationType" },
            { text: "City", value: "city"},
            { text: "State", value: "stateFull" },
            { text: "Country", value: "country" },
            { text: "Actions", value: "actions" }


            // id: ID!
            // name: String
            // mainLocation: Boolean
            // address: String
            // postalCode: String
            // city: String
            // stateCode: String
            // stateFull: String
            // country: String
            // lat: String
            // lng: String
            // locationType: String
            
        ] 
    }),
    methods: {
        appendToItems() {
            this.items.push({
                id: + new Date(),
                name: "",
                mainLocation: false,
                address: "",
                postalCode: "",
                city: "",
                stateCode: "",
                stateFull: "", 
                country: "",
                lat: "",
                lng: "",
                locationType: ""
            })
        }
    }
}
</script>
<!--
{ label: 'Main Location', value: 'main-location' },
  { label: 'Headquarters', value: 'headquarters' },
  { label: 'Branch', value: 'branch' },
  { label: 'Division', value: 'division' },
  { label: 'Remote Location', value: 'remote-location' },
  { label: 'Subsidiary', value: 'subsidiary' },
  { label: 'Region', value: 'region' },
  { label: 'Administrative', value: 'administrative' },
  { label: 'Trailer', value: 'trailer' },
  { label: 'Department', value: 'department' },
  { label: 'Field Office', value: 'field-office' }

-->