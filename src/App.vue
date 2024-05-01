<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePointsStore } from '@/stores/points'

import ProgressSpinner from 'primevue/progressspinner'
import PointsList from '@/components/PointsList.vue'
import Map from '@/components/Map.vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const pointsStore = usePointsStore()
const { error } = storeToRefs(pointsStore)
const toast = useToast()

watch(error, (newValue) => {
  if (newValue === true) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Ошибка загрузки данных',
      life: 3000
    })
  }
})

onMounted(async () => {
  await pointsStore.fetchPoints()
  pointsStore.points[0].selected = true
  pointsStore.currentPointId = pointsStore.points[0].id
})
</script>

<template>
  <div class="grid mx-auto px-3 py-5" style="max-width: 1200px">
    <div class="col-4">
      <points-list />
    </div>
    <div class="col-8">
      <Map />
    </div>
  </div>

  <ProgressSpinner
    v-if="pointsStore.loading"
    class="fixed"
    style="width: 80px; height: 80px; left: calc(50% - 40px); top: calc(50% - 40px)"
    strokeWidth="3"
    aria-label="Загрузка"
  />

  <Toast />
</template>

<style scoped></style>
