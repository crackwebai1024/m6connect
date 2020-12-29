
<template>
  <div style="inline-flex">
    <kanban-board
      :blocks="rapids"
      class="lists w-100"
      :stages="stages"
      style="margin-top:5px; height: 100%;"
      @update-block="updateBlock"
    >
      <div
        v-for="stage in stages"
        :key="stage"
        :slot="stage"
        class="w-5"
      >
        <h5>
          {{ stage }}
        </h5>
      </div>
      <div
        v-for="task in rapids"
        :key="task.id"
        :slot="task.id"
        class="item-blocks"
      >
        <div style="display:inline-block; width: 100%; padding: 3px;">

          <div @click="taskEditModal(task)">
            {{ task.title }}
          </div>

        </div>
      </div>
    </kanban-board>
  </div>
</template>


<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      rapids: [],
      stages: [ 'Backlog', 'Documentation', 'ToDo', 'In Progress', 'Rework', 'Pull Request', 'Review', 'UAT', 'Done' ],
      priorities: [
        {
          name: 'Highest',
          icon: 'arrow_upward',
          color: '#F44336'
        }, {
          name: 'High',
          icon: 'arrow_upward',
          color: '#FF9800'
        },
        {
          name: 'Medium',
          icon: 'arrow_upward',
          color: '#FFEB3B'
        }, {
          name: 'Low',
          icon: 'arrow_downward',
          color: '#4CAF50'
        },
        { name: 'Lowest', icon: 'arrow_downward', color: '#8BC34A' }
      ]
    }
  },
  watch: {
    // blocks(newBlocks, oldBlocks) {
    //   this.blocksGotten = []
    //   for (let x = 0; x < newBlocks.length; x++) {
    //     const tempBlock = newBlocks[x]
    //     // tempBlock.updatePriority = false
    //     this.blocksGotten.push(tempBlock)
    //   }
    // }
  },
  methods: {
    ...mapActions('RapidTicket', {
      getRapidList: 'getList'
    }),

    ...mapMutations('SnackBarNotif', {
      notifDanger: 'notifDanger',
      notifSuccess: 'notifSuccess'
    }),

    updateBlock: function (id, status) {
      // this.blocks.find(b => b.id === id).status = status
      // this.$emit('update-task-general', this.blocks.find(b => b.id === id))
      console.log('update-----')
      console.log(id)
      console.log('status-----')
      console.log(status)
    },
    getBlockNums: function (stage) {
      return this.blocks.filter(b => b.status == stage).length
    },
    getInitials: function (item) {
      const nameArr = item.assignee.split(' ')
      return nameArr[0][0].toUpperCase() + nameArr[1][0].toUpperCase()
    },
    taskEditModal: function (task) {
      this.$emit('edit-task', task)
    },
    detect(prop, task) {
      task.priority = prop
      this.$emit('update-task-general', task)
    },
    getPriorityColor(priority) {
      return this.priorities.find(p => p.name == priority).color
    }
  },

  async mounted() {
    try {
      this.rapids = await this.getRapidList()
      console.log('rapids')
      console.log(this.rapids)
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
.inline-flex {
  display: inline-flex;
}
.w-100 {
  width: 120vw;
}
.w-5 {
  width: 5rem !important;
}
.float {
    position:absolute;
    z-index:99;
    width:500px;
}
  $on-hold: #FB7D44;
  $in-progress: #2A92BF;
  $needs-review: #F4CE46;
  $approved: #00B961;
  $merged: #00A970;
  * {
    box-sizing: border-box;
  }
  .drag-column {

    .drag-column-header {
      padding: 0;

      div {
        width: 100%;
        h2 > a {
          float: right;
        }
      }
    }
    .drag-column-footer > div {
        margin-left: 10px;
        a {
            text-decoration: none;
            color: white;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    &-on-hold {
      .drag-column-header,
      .is-moved,
      .drag-options {
        background: $on-hold;
      }
    }
    &-in-progress {
      .drag-column-header,
      .is-moved,
      .drag-options {
        background: $in-progress;
      }
    }
    &-needs-review {
      .drag-column-header,
      .is-moved,
      .drag-options{
        background: $needs-review;
      }
    }
    &-approved {
      .drag-column-header,
      .is-moved,
      .drag-options {
        background: $approved;
      }
    }
    &-merged{
      .drag-column-header,
      .is-moved,
      .drag-options {
        background: $merged;
      }
    }
  }
  .section {
    padding: 20px;
    text-align: center;
    a {
      color: white;
      text-decoration: none;
      font-weight: 300;
    }
    h4 {
      font-weight: 400;
      a {
        font-weight: 600;
      }
    }
  }
    .lists ul{
      height: 100%; width: 100%;
    }


  	/* Some Sass variables */
    // Layout
    $appbar-height: 70px;
    $navbar-height: 0px;
    $list-width: 300px;
    $gap: 10px;
    $scrollbar-thickness: 17px;
    $list-header-height: 36px;
    $list-footer-height: 36px;
    // Misc
    $list-border-radius: 0px;
    $card-border-radius: 0px;
    // Colors
    $board-bg-color: #E3E3E3;
    $appbar-bg-color: #ECECEC;
    $list-bg-color: #ECECEC;

    .ui {
      height: 100vh;

      display: grid;
      grid-template-rows: $appbar-height $navbar-height 1fr;
      //grid-template-columns: 100%;

      background-color: $board-bg-color;
      color: #eee;
    }

    .navbar {
      padding-left: $gap;
      display: flex;
      align-items: center;
      &.app {
        background-color: $appbar-bg-color;
        font-size: 1.5rem;
      }
      &.board {
        font-size: 1.1rem;
      }
    }

    .lists {
      display: flex;
      //overflow-x: auto;
      //width: 100%; // This is needed for FF < 54
      > * {
        flex: 0 0 auto; // 'rigid' lists
        margin-left: $gap;
      }
      &::after {
        content: '';
        flex: 0 0 $gap;
      }
    }

    .list {
      width: $list-width;
      height: calc(100% - #{$gap} - #{$scrollbar-thickness});

      > * {
        background-color: $list-bg-color;
        color: #333;

        padding: 0 $gap;
      }

      header {
        line-height: $list-header-height;
        font-size: 16px;
        font-weight: bold;
        border-top-left-radius: $list-border-radius;
        border-top-right-radius: $list-border-radius;
      }

      footer {
        line-height: $list-footer-height;
        border-bottom-left-radius: $list-border-radius;
        border-bottom-right-radius: $list-border-radius;
        color: #888;
      }

      ul {
        // list-style: none;
        // margin: 0;

        // max-height: calc(100% - #{$list-header-height} - #{$list-footer-height});
        // overflow-y: auto;
        width: 200vw !important;

        li {
          background-color: #fff;
          padding: $gap;
          &:not(:last-child) {
            margin-bottom: $gap;
          }

          border-radius: $card-border-radius;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

          img {
            display: block;
            width: calc(100% + 2 * #{$gap});
            margin: -$gap 0 $gap (-$gap);
            border-top-left-radius: $card-border-radius;
            border-top-right-radius: $card-border-radius;
          }
        }
      }
    }

  .circle-text {
    display: table-cell;
    height: 30px;
 /*change this and the width for the size of your initial circle*/
    width: 30px;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
  /*make it pretty*/
    background: #000;
    color: #fff;
  /*change this for font-size and font-family*/
}


.avatars {
  display: inline-flex;
  flex-direction: row-reverse;
  padding-left:50px;
}

.avatar {
  margin-left: -10px;
  position: relative;
  border:1px solid #fff;
  border-radius: 50%;
  overflow:hidden;
  width:50px;
  height:50px;
}

.avatar img {
  width:50px;
  height:50px;
}


/* experiment from here on */
 @import '../../assets/kanban.scss';
  .drag-container {
    // max-width: 1400px;
    max-width: 100vw;
    overflow: auto;
    height: 45vh;

    .drag-list {
      width: 4000px;
    }

    .drag-column {
      background: #eee;
      border-radius: 0px;
      padding-bottom: 40px;

      .drag-column-header {
        padding-left: 20px;
        padding-right: 20px;
        h2 {
          font-size: 1.1rem;
          color: #878787;;
        }
      }

      .drag-inner-list {
        .drag-item {
          padding: 0px;
          background: #FEFEFE;
          border: none;
          border-radius: 0px;
          opacity: 1;
          color: #404040;
          width: 20rem !important; 

          &.is-moving {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
            background: #0c75c6;
            color: #FFF;
            opacity: .2;
          }

          .task-top {
            .labels {
              width: 50%;
              display: inline-block;

              .task-label-indicator {
                height: 8px;
                border-radius: 0px;

                &.low {
                  background: #61ff69;
                }
                &.normal {
                  background: #265a7f;
                }
                &.high {
                  background: #ffe061;
                }
                &.critical {
                  background: #ff6961;
                }
              }
            }

            .actions {
              width: 50%;
              display: inline-block;
              color: #AEAEAE;

              .fa {
                padding-left: 8px;
                cursor: pointer;

                &:hover {
                  color: #0f75bc;
                }
              }
            }
          }

          .task-title {
            padding: 12px 0;

            h5 {
              margin: 0;
            }
          }

          .task-bottom {
            color: #AAA;

            div {
              display: inline-block;
              width: 33%;

              .fa {
                padding-left: 6px;
              }
            }

            .info {
            }
            .actions {
              .fa {
                cursor: pointer;

                &:hover {
                  color: #0f75bc;
                }
              }
            }
            .assignment {
              width: 34%;
            }
          }
        }
      }
    }
  }

  .drag-item.gu-mirror {
    background: #FFF !important;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    border: 1px solid #DDD;
    .actions {
      display: none;
    }
  }

  .dropdown-menu {
    a:hover {
      background: #C0C0C0;
    }
  }


  .circle-text {
    display: table-cell;
    height: 30px;
 /*change this and the width for the size of your initial circle*/
    width: 30px;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
  /*make it pretty*/
    background: #000;
    color: #fff;
  /*change this for font-size and font-family*/
}

.item-blocks {
  border-left-style: solid;
  // width: 100%; 
  width: 30rem;
  display: inline-block;
  cursor: pointer;
  display: flex
}

// .drag-list {
//     width: 4000px;
// }

// .drag-container {
//     width: 100vw;
//     overflow: auto;
//     height: 45vh;
// }

// .lists ul {
//     width: 200vw;
// }

// .drag-item {
//     width: 20rem;
// }

</style>
