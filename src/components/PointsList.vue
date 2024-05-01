<script setup lang="ts">
import { ref } from 'vue'
import { usePointsStore } from '@/stores/points'
import VirtualScroller from 'primevue/virtualscroller'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'

const selectAll = ref<boolean>(false)

const pointsStore = usePointsStore()
</script>

<template>
  <div class="flex justify-content-between align-items-end pl-3 pb-3">
    <checkbox
      v-model="selectAll"
      @change="
        () => {
          pointsStore.selectAll(selectAll)
        }
      "
      :binary="true"
    />

    <input-text type="text" v-model="pointsStore.filter" placeholder="Фильтр" />
  </div>

  <virtual-scroller
    :items="pointsStore.filteredPoints"
    :itemSize="70"
    class="border-1 surface-border border-round"
    style="height: 500px"
  >
    <template v-slot:item="{ item, options }">
      <div
        :class="[
          'flex p-3 gap-2 cursor-pointer',
          {
            'surface-hover': item.id === pointsStore.currentPointId
          }
        ]"
        style="height: 70px"
        @click="
          () => {
            item.selected = true
            pointsStore.currentPointId = item.id
          }
        "
      >
        <checkbox v-model="item.selected" @click.stop :binary="true" />
        <div class="flex flex-column">
          <div>
            <i className="pi pi-map"></i>
            {{ item.title }}
          </div>
          <div
            class="overflow-hidden text-xs text-overflow-ellipsis white-space-nowrap max-w-18rem"
          >
            <i className="pi pi-map-marker text-xs"></i>
            {{ item.address }}
          </div>
        </div>
      </div>
    </template>
  </virtual-scroller>
</template>

<style scoped></style>
