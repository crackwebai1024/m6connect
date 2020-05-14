<template>
  <div>
    <!--Toolbar-->
    <v-toolbar
      class="m6_breadcrumb"
      dense
      flat
    >
      <v-row align="center"
             class="fill-height"


      >
        <v-avatar size="28">
          <img
            alt="avatar"
            src="https://vuetifyjs.com/apple-touch-icon-180x180.png"
          >
        </v-avatar>
        <p>Héctor Fierro, M6Connect</p>
        <v-spacer />
        <v-btn
          class="m6_btn_xs"
          color="green darken-2"
          dark
          fab
          icon
        >
          <v-icon class="m6_icon_bold">
            add
          </v-icon>
        </v-btn>
      </v-row>
    </v-toolbar>

    <v-container class="pt-0 px-0"
                 fluid
    >
      <v-row


      >
        <!--First Column-->
        <v-col
          cols="12"
          md="3"
        >
          <v-card height="100%">
            <v-toolbar flat>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title class="text-center title">
                    Contacts
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-toolbar>
            <v-divider />
            <contact-list
              :contact="contacts[0]"
              :main="true"
            />

            <v-col
              class="m6_banner_dark py-3"
              cols="12"
            >
              <v-row align="center"
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
          </v-card>
        </v-col>

        <!--Second Column -->
        <v-col
          cols="12"
          md="3"
        >
          <v-img
            min-height="250px"
            src="https://www.deutschland.de/sites/default/files/styles/crop_page/public/media/image/work-and-travel-germany-jobs.jpg?h=55f18e7c&itok=i5d7MByo"
          />
          <h2 class="title">
            Spectrum Boardroom & Auditorium AV Refresh
          </h2>
          <p>Company</p>
          <p>Amount</p>
          <p>Campus</p>
          <p>Contact</p>
          <v-row
            align="center"


          >
            <v-col
              cols="12"
              md="6"
            >
              Notifications
            </v-col>
            <v-col class="text-right"
                   cols="12"
                   md="6"
            >
              <v-btn
                color="blue darkeen-1"
                dark
                fab
                small
              >
                <v-icon>edit</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <!--Third Column-->
        <v-col
          cols="12"
          md="6"
        >
          <v-toolbar
            flat
          >
            <v-row align="center"
                   class="fill-height"
            >
              <v-avatar size="28">
                <img
                  alt="avatar"
                  src="https://vuetifyjs.com/apple-touch-icon-180x180.png"
                >
              </v-avatar>
              <p class="mb-0">
                Sharp Healthcare: Projects
              </p>
              <v-spacer />
              <v-col
                cols="12"
                md="5"
              >
                <v-select
                  prepend-icon="filter_list"
                >
                  <template slot="append">
                    <v-btn
                      color="blue darkeen-1"
                      outline
                      small
                    >
                      Filter
                    </v-btn>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-toolbar>
          <v-container>
            <v-row align="start"
                   class="fill-height"
            >
              <swiper
                ref="mySwiper"
                class="m6_swiper_multiple"
                :options="swiperComponentOption"
              >
                <template v-for="n in 10">
                  <swiper-slide
                    :key="n"
                  >
                    <ProjectSwipeSlide />
                  </swiper-slide>
                </template>

                <div
                  slot="button-prev"
                  class="m6_swiper-button-prev m6_swiper-buttons swiper-button-prev"
                />
                <div
                  slot="button-next"
                  class="m6_swiper-button-next m6_swiper-buttons swiper-button-next"
                />
              </swiper>
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
  loop: true,
  slidesPerView: 5,
  slidesPerGroup: 3,
  spaceBetween: 10,
  slidesPerColumn: 2,
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
    uid: 2,
    name: 'Leila Fierro',
    email: 'leila@m6connect.com',
    phone: '(656) 265-4653',
    profilePic: 'https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/40642305_1701654173293617_1113822012129673216_o.jpg?_nc_cat=107&_nc_sid=a4a2d7&_nc_eui2=AeGLd5Z2q9BtLiWEGvlVS0-U4GttDzruAaLga20POu4BokdiOPlD8LdnyUM-SErBjdk&_nc_ohc=Ba1o4RNyOZ8AX-7IPPQ&_nc_ht=scontent.felp1-1.fna&oh=1cfe8e6ac4ad762f064330159178dbd2&oe=5EE4C847'
  },
  {
    uid: 3,
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
