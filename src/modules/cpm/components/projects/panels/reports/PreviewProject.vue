<template>
  <v-card
    flat
    fluid
  >
    <v-card-title
      class="title"
      primary-title
    >
      {{ project.title }}
    </v-card-title>
    <v-card-text>
      <v-container
        class="pa-0"
        fluid
        grid-list-md
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            md6
            sm12
          >
            <v-avatar
              size="80px"
              :title="false"
            >
              <img :src="project.image">
            </v-avatar>
          </v-flex>
          <v-flex
            v-show="previewOptions.checkProjectDescription"
            md6
            sm12
          >
            <strong>Description</strong>
          </v-flex>
          <v-flex
            md6
            sm12
          >
            {{ project.description }}
          </v-flex>
        </v-layout>
        <v-layout
          v-show="previewOptions.checkProfile"
          row
          wrap
        >
          <v-flex
            md6
            sm12
          >
            <v-container
              fluid
              grid-list-md
            >
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Manager</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  {{ projectGroup.managerName }}
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Category</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  {{ project.category }}
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Type</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  {{ project.type }}
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Budget</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  ${{ project.budgetTotal }}
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Start Date</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  {{ project.startDate }}
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>End Date</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  {{ project.endDate }}
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Number</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  {{ project.number }}
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Licensing</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  {{ project.license }}
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex
            md6
            sm12
          >
            <v-container
              fluid
              grid-list-md
            >
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Phase</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  {{ project.phase }}
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Phase Target Date</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  {{ project.phaseTargetDate }}
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Percentage Complete</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  {{ project.completion ? project.completion : 0 }}%
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Budget Status</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  {{ project.budgetStatus }}
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Commitments</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  ${{ project.commitmentsTotal }}
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Spend to Date</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  ${{ project.spendingTotal }}
                </v-flex>
              </v-layout>
              <v-layout
                row
                wrap
              >
                <v-flex
                  md6
                  sm12
                >
                  <strong>Proposed Spend</strong>
                </v-flex>
                <v-flex
                  md6
                  sm12
                >
                  ${{ project.changesTotal }}
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>

        <v-layout
          v-show="previewOptions.checkProjectPhotos"
          row
          wrap
        >
          <v-flex md12>
            <gallery
              :files="project.files[4].children[5].children"
              title="Project Photos"
            />
          </v-flex>
        </v-layout>

        <v-layout
          v-show="previewOptions.comments"
          row
          wrap
        >
          <v-flex
            md12
            sm12
          >
            <budget-comment :pid="project.id" />
          </v-flex>
          <v-flex
            md12
            sm12
          >
            <status-comment :pid="project.id" />
          </v-flex>
        </v-layout>

        <v-layout
          v-show="previewOptions.checkMilestones"
          row
          wrap
        >
          <v-flex md12>
            <v-card>
              <v-card-text>
                <v-container
                  class="pa-0"
                  fluid
                  grid-list-md
                >
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex md12>
                      <milestones :pid="project.id" />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout
          v-show="previewOptions.checkCostSummary"
          row
          wrap
        >
          <v-flex md12>
            <financial-cost-summary :pid="project.id" />
          </v-flex>
        </v-layout>

        <v-layout
          v-show="previewOptions.checkCommitments"
          row
          wrap
        >
          <v-flex md12>
            <financial-commitments :pid="project.id" />
          </v-flex>
        </v-layout>

        <v-layout
          v-show="previewOptions.checkSpending"
          row
          wrap
        >
          <v-flex md12>
            <financial-spendings :pid="project.id" />
          </v-flex>
        </v-layout>

        <v-layout
          v-show="previewOptions.checkCommitmentPictures"
          row
          wrap
        >
          <v-flex md12>
            <gallery
              :files="project.files[1].children[9].children"
              title="Commitment Pictures"
            />
          </v-flex>
        </v-layout>

        <v-layout
          v-show="previewOptions.checkSpendingPictures"
          row
          wrap
        >
          <v-flex md12>
            <gallery
              :files="project.files[1].children[6].children"
              title="Spending Pictures"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import FinancialCostSummary from '../FinancialCostSummary'
import Gallery from './PreviewComponents/Gallery'
import BudgetComment from '../BudgetComment'
import StatusComment from '../StatusComment'
import FinancialCommitments from '../FinancialCommitments'
import FinancialSpendings from '../FinancialSpendings'
import Milestones from '../schedule/Milestones'

export default {
  components: {
    FinancialCostSummary,
    Gallery,
    BudgetComment,
    StatusComment,
    FinancialCommitments,
    FinancialSpendings,
    Milestones
  },
  props: {
    projectGroup: {
      type: Object,
      required: true
    },
    project: {
      type: Object,
      required: true
    },
    previewOptions: {
      type: Object,
      required: true
    }
  }
}
</script>
