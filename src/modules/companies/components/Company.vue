<template>
  <div>
    <!--TODO: Make this a component-->
    <!--Toolbar-->
    <v-toolbar
      class="m6_breadcrumb px-3"
      dense
      flat
    >
      <v-row
        align="center"
        class="fill-height"
      >
        <v-avatar size="28">
          <img
            alt="avatar"
            src="https://vuetifyjs.com/apple-touch-icon-180x180.png"
          >
        </v-avatar>
        <p class="mb-0">
          Héctor Fierro, M6Connect
        </p>
        <v-spacer />
        <v-btn
          class="m6_btn_xs"
          color="green darken-2"
          fab
        >
          <v-icon class="m6_icon_bold">
            add
          </v-icon>
        </v-btn>
      </v-row>
    </v-toolbar>

    <v-container
      class="pa-0"
      fluid
    >
      <v-row>
        <!--First Column-->
        <v-col
          class="pt-0"
          cols="12"
          md="3"
        >
          <div>
            <v-col class="m6_bg_blue--darken-2 m6_dropdown mb-3 pa-5 text-center">
              <h2>
                Contacts
              </h2>
            </v-col>
            <v-divider />
            <contact-list
              :contact="contacts[0]"
              :main="true"
            />

            <v-col
              class="m6_banner_dark py-0"
              cols="12"
            >
              <v-row
                align="center"
                class="fill-height"
              >
                <v-col
                  class="text-center text-sm-right"
                  cols="12"
                  sm="3"
                >
                  <v-icon
                    class="pr-3"
                    color="orange"
                  >
                    star
                  </v-icon>
                </v-col>
                <v-col
                  class="text-center text-sm-left"
                  cols="12"
                  sm="8"
                >
                  Indicates who from your team will receive RFP invitations from Sharp
                </v-col>
              </v-row>
            </v-col>

            <contact-list
              v-for="contact in contacts"
              :key="contact.uid"
              :contact="contact"
            />
          </div>
        </v-col>

        <!--Second Column -->
        <v-col
          class="m6_bg_blue pt-0 px-0"
          cols="12"
          md="3"
        >
          <div class="relative">
            <v-img
              min-height="466px"
              src="https://www.deutschland.de/sites/default/files/styles/crop_page/public/media/image/work-and-travel-germany-jobs.jpg?h=55f18e7c&itok=i5d7MByo"
            />
            <div class="m6_bg_blue--darken-3 m6_bottom m6_dark m6_right m6_tag_absolute px-6 py-1">
              <span>Invited</span>
            </div>
          </div>
          <h2 class="m6_title pa-sm-2 text-center">
            Spectrum Boardroom & Auditorium AV Refresh
          </h2>

          <!--TODO: Make this a component-->
          <v-col cols="12 d-flex">
            <v-col class="m6_bg_blue--darken-3 py-0">
              <p class="mb-0">
                Company
              </p>
            </v-col>
            <v-col class="m6_bg_blue--darken-3 py-0 text-right">
              asdfasdf
            </v-col>
          </v-col>

          <v-col cols="12 d-flex">
            <v-col class="m6_bg_blue--darken-3 py-0">
              <p class="mb-0">
                Amount
              </p>
            </v-col>
            <v-col class="m6_bg_blue--darken-3 py-0 text-right">
              asdfasdf
            </v-col>
          </v-col>

          <v-col cols="12 d-flex">
            <v-col class="m6_bg_blue--darken-3 py-0">
              <p class="mb-0">
                Campus
              </p>
            </v-col>
            <v-col class="m6_bg_blue--darken-3 py-0 text-right">
              asdfasdf
            </v-col>
          </v-col>
          <v-col cols="12 d-flex">
            <v-col class="m6_bg_blue--darken-3 py-0">
              <p class="mb-0">
                Contact
              </p>
            </v-col>
            <v-col class="m6_bg_blue--darken-3 py-0 text-right">
              asdfasdf
            </v-col>
          </v-col>

          <v-col cols="12 d-flex">
            <v-col class="m6_bg_blue--darken-3 py-0">
              <p class="mb-0">
                Notifications
              </p>
            </v-col>
            <v-col class="m6_bg_blue--darken-3 py-0 text-right">
              asdfasdf
            </v-col>
          </v-col>
        </v-col>
        <!--Third Column-->
        <v-col
          class="pt-0"
          cols="12"
          md="6"
        >
          <v-container class="pt-0">
            <v-row
              align="center"
              class="m6_bg_blue--darken-2 mb-2"
            >
              <v-col
                class="m6_dropdown"
                cols="12"
                sm="5"
              >
                <h2>
                  Vendor Profile
                </h2>
              </v-col>

              <v-col
                class="m6_dropdown text-right"
                cols="12"
                sm="3"
              >
                <h3>
                  Cards
                </h3>
              </v-col>


              <v-col>
                <v-text-field
                  :append-outer-icon="'more_vert'"
                  class=""
                  placeholder="Search"
                  :prepend-icon="'fullscreen'"
                />
              </v-col>
            </v-row>

            <!--Swiper-->
            <v-row align="start">
              <v-col cols="12">
                <swiper
                  ref="mySwiper"
                  :options="swiperComponentOption"
                >
                  <swiper-slide>
                    <ProjectSwipeSlide />
                  </swiper-slide>

                  <div
                    slot="button-prev"
                    class="m6_swiper-button-prev m6_swiper-buttons swiper-button-prev"
                  />
                  <div
                    slot="button-next"
                    class="m6_swiper-button-next m6_swiper-buttons swiper-button-next"
                  />
                </swiper>
              </v-col>
            </v-row>

            <v-row
              align="center"
              class="m6_bg_blue--darken-2 mb-2"
            >
              <v-col
                class="m6_dropdown"
                cols="12"
                sm="5"
              >
                <h3>
                  General Information
                </h3>
              </v-col>

              <v-col
                class="m6_dropdown text-right"
                cols="12"
                sm="3"
              >
                <h3>
                  Widgets
                </h3>
              </v-col>


              <v-col>
                <v-text-field
                  :append-outer-icon="'more_vert'"
                  class=""
                  placeholder="Search"
                  :prepend-icon="'fullscreen'"
                />
              </v-col>
            </v-row>

            <v-row justify="space-around">
              <v-col
                class="m6_gradient_blue m6_widget_icon text-center"
              >
                <i class="fa-lightbulb fas" />
              </v-col>
              <v-col
                class="m6_gradient_orange m6_widget_icon text-center"
              >
                <i class="fa-laptop-code fas" />
              </v-col>
              <v-col
                class="m6_gradient_red m6_widget_icon text-center"
              >
                <i class="fa-clipboard-check fas" />
              </v-col>
              <v-col
                class="m6_gradient_blue m6_widget_icon text-center"
              >
                <i class="fa-handshake fas" />
              </v-col>
              <v-col
                class="m6_gradient_green m6_widget_icon text-center"
              >
                <i class="fa-bell fas" />
              </v-col>
              <v-col
                class="m6_gradient_orange m6_widget_icon text-center"
              >
                <ios-arrow-down-icon
                  h="48px"
                  w="48px"
                />
              </v-col>
              <v-col
                class="m6_gradient_red m6_widget_icon text-center"
              >
                <i class="fa-clipboard-check fas" />
              </v-col>
              <v-col
                class="m6_gradient_blue m6_widget_icon text-center"
              >
                <i class="fa-handshake fas" />
              </v-col>
              <v-col
                class="m6_gradient_green m6_widget_icon text-center"
              >
                <i class="fa-bell fas" />
              </v-col>
              <v-col
                class="m6_gradient_orange m6_widget_icon text-center"
              >
                <i class="fa-laptop-code fas" />
              </v-col>
              <v-col
                class="m6_gradient_red m6_widget_icon text-center"
              >
                <i class="fa-clipboard-check fas" />
              </v-col>
              <v-col
                class="m6_gradient_blue m6_widget_icon text-center"
              >
                <i class="fa-handshake fas" />
              </v-col>
              <v-col
                class="m6_gradient_green m6_widget_icon text-center"
              >
                <i class="fa-bell fas" />
              </v-col>
              <v-col
                class="m6_gradient_orange m6_widget_icon text-center"
              >
                <ios-arrow-down-icon
                  h="48px"
                  w="48px"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ContactList from '@/components/contacts/List.vue'
import { Contact } from '@/shared/interfaces'
import ProjectSwipeSlide from '@/components/projects/Swiper.vue'
import { SwiperOptions } from 'swiper'

@Component({
  components: { ContactList, ProjectSwipeSlide }
})
export default class CompanyIndex extends Vue {
navigationDrawer = true;

swiperComponentOption: SwiperOptions = {
  slidesPerView: 4,
  slidesPerColumn: 2,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
}

contacts: Array<Contact> = [
  {
    uid: 1,
    name: 'Héctor Fierro',
    email: 'hector@m6connect.com',
    phone: '(656) 265-4653',
    profilePic: 'https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/92216735_10158595634319026_9048311098310131712_n.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_eui2=AeFe-Ts0DwaIHlvfsGN3c6By60QPVHzHIRLrRA9UfMchEtIDBp9i1ExWV8duStW_twQ&_nc_ohc=wCg7RM27EhoAX9Usost&_nc_ht=scontent.felp1-1.fna&oh=e548289d4a489c4c27026e8bd3e86eb7&oe=5EE05E65'
  },
  {
    uid: 2,
    name: 'Karla Robles',
    email: 'karla@m6connect.com',
    phone: '(656) 265-4653',
    profilePic: 'https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/93009667_2678667545592270_8801538929070178304_n.jpg?_nc_cat=106&_nc_sid=8bfeb9&_nc_eui2=AeGF3ajAgE_4dHuNyNlBqe_CuGzObQpM7Qu4bM5tCkztC1YgY5emCAW2q5A16xIPQgY&_nc_ohc=FdERl_t6y1cAX9eIzTB&_nc_ht=scontent.felp1-1.fna&oh=c72aa32bdd3c06ec700ca8128a329208&oe=5EDE5B07'
  },
  {
    uid: 3,
    name: 'Leila Fierro',
    email: 'leila@m6connect.com',
    phone: '(656) 265-4653',
    profilePic: 'https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/40642305_1701654173293617_1113822012129673216_o.jpg?_nc_cat=107&_nc_sid=a4a2d7&_nc_eui2=AeGLd5Z2q9BtLiWEGvlVS0-U4GttDzruAaLga20POu4BokdiOPlD8LdnyUM-SErBjdk&_nc_ohc=Ba1o4RNyOZ8AX-7IPPQ&_nc_ht=scontent.felp1-1.fna&oh=1cfe8e6ac4ad762f064330159178dbd2&oe=5EE4C847'
  },
  {
    uid: 4,
    name: 'Emilio Romero',
    email: 'emilio@m6connect.com',
    phone: '(656) 265-4653',
    profilePic: 'https://avatars0.githubusercontent.com/u/13983577?s=460&u=9c0ae13db0210809c6f17f90a30c954112218fbb&v=4'
  },
  {
    uid: 5,
    name: 'Kevin Corrales',
    email: 'cristian@m6connect.com',
    phone: '(656) 265-4653',
    profilePic: 'https://avatars1.githubusercontent.com/u/16002376?s=400&u=858b0c0e214c39936415d94540c608db7de766b6&v=4'
  }
]
}
</script>
