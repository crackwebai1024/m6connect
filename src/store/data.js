import RequestTab from "@/components/Tabs/RequestTab";
import TicketTab from "@/components/Tabs/TicketTab";

export default{
  // Home Data
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
    ],
  // Tabs Data
    get_tabs: () => [
      { tab: 'Request', content: RequestTab },
      { tab: 'Tickets', content: TicketTab },
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
    get_ticket_table_header: () => [
      { text: 'Ticket #', align: 'start', value: 'id'},
      { text: 'Project Name', value: 'project_name' },
      { text: 'Summary', value: 'summary' },
      { text: 'Description', value: 'description' },
      { text: 'Component', value: 'component' },
      { text: 'Fix Version', value: 'fix_version' },
      { text: 'Priority', value: 'priority' },
      { text: 'Labels', value: 'labels'},
      { text: 'Linked Issues', value: 'lincked_issues' },
      { text: 'Issues', value: 'isues' },
      { text: 'Affects Versions', value: 'affects_versions' },
      { text: 'Assignee', value: 'assignee' },
      { text: 'Epic Link', value: 'epic_link' },
      { text: 'Story Points', value: 'story_points'},
      { text: 'Ranck Project Issue', value: 'ranck_project_issue' },
      { text: 'Start Date', value: 'start_date' },
      { text: 'Actions', value: 'actions' },
    ],
}