import RequestTab from "@/components/RecordMode/RecordCommponents/Tabs/RequestTab";
import TicketTab from "@/components/RecordMode/RecordCommponents/Tabs/TicketTab";

export default{
  // Home Data
    get_views_list: () => [
      { name: 'Request', iconName: "mdi-map-marker", route: "Hi" },
      { name: 'Tickets', iconName: "mdi-map-marker", route: "Hi" },
      { name: 'Projects', iconName: "mdi-map-marker", route: "Hi" },
      { name: 'Matrix', iconName: "mdi-map-marker", route: "Hi" },
      { name: 'Schedulez', iconName: "mdi-map-marker", route: "Hi" },
      { name: 'Teams', iconName: "mdi-map-marker", route: "Hi" },
      { name: 'By Company', iconName: "mdi-map-marker", route: "Hi" },
      { name: 'Meeting Notes', iconName: "mdi-map-marker", route: "Hi" },
      { name: "request", iconName: "mdi-map-marker", route: "Hi",},
      { name: "request", iconName: "mdi-map-marker", route: "Hi",},
      { name: "request", iconName: "mdi-map-marker", route: "Hi",},
      { name: "request", iconName: "mdi-map-marker", route: "Hi",},
      { name: "request", iconName: "mdi-map-marker", route: "Hi",},
      { name: "request", iconName: "mdi-map-marker", route: "Hi",},
      { name: "request", iconName: "mdi-map-marker", route: "Hi",},
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
    get_widgets: () => [
      {
        icon: 'mdi-account-voice', 
        name:'Request',
        component: RequestTab
      },{
        icon: 'mdi-ticket',   
        name:'Tickets',
        component: TicketTab
      },{
        icon: 'mdi-briefcase',
        name:'Projects',
        component: RequestTab
      },{
        icon: 'mdi-format-textbox',   
        name:'Matrix',
        component: RequestTab
      },{
        icon: 'mdi-format-bold', 
        name:'Schedulez',
        component: RequestTab
      },{
        icon: 'mdi-format-italic',   
        name:'Teams',
        component: RequestTab
      },{
        icon: 'mdi-format-underline',
        name:'By Company',
        component: TicketTab
      },{
        icon: 'mdi-format-italic',   
        name:'Meeting Notes',
        component: TicketTab
      }
    ],
    get_widgets_previews(preview_list_widget_data){
      let data =[];
      this.get_widgets().forEach(widget => {
        let index = preview_list_widget_data.indexOf(widget.name);
        index >=0 ? data.push(widget) : null;
      })
      return data;
    }
}