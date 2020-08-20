import RequestTab from "@/components/Tabs/RequestTab";

export default{
    get_tabs: () => [
      { tab: 'Request', content: RequestTab },
      { tab: 'Tickets', content: RequestTab },
      { tab: 'Projects', content: RequestTab },
      { tab: 'Matrix', content: RequestTab },
      { tab: 'Schedulez', content: RequestTab },
      { tab: 'Teams', content: RequestTab },
      { tab: 'By Company', content: RequestTab },
      { tab: 'Meeting Notes', content: RequestTab },
    ],
    get_request_table_header: () => [
      { text: 'Name', align: 'start', value: 'name'},
      { text: 'Description', value: 'description' },
      { text: 'Phase', value: 'phase' },
      { text: 'Actions', value: 'actions' }
    ],
    get_views_list: () => [
      {
        name: "request",
        iconName: "mdi-map-marker",
        route: "Hi",
      },
      {
        name: "request",
        iconName: "mdi-map-marker",
        route: "Hi",
      },
      {
        name: "request",
        iconName: "mdi-map-marker",
        route: "Hi",
      },
      {
        name: "request",
        iconName: "mdi-map-marker",
        route: "Hi",
      },
      {
        name: "request",
        iconName: "mdi-map-marker",
        route: "Hi",
      },
      {
        name: "request",
        iconName: "mdi-map-marker",
        route: "Hi",
      },
      {
        name: "request",
        iconName: "mdi-map-marker",
        route: "Hi",
      },
      {
        name: "request",
        iconName: "mdi-map-marker",
        route: "Hi",
      },
      {
        name: "request",
        iconName: "mdi-map-marker",
        route: "Hi",
      },
      {
        name: "request",
        iconName: "mdi-map-marker",
        route: "Hi",
      },
      {
        name: "request",
        iconName: "mdi-map-marker",
        route: "Hi",
      },
      {
        name: "request",
        iconName: "mdi-map-marker",
        route: "Hi",
      },
    ]
}