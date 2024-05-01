<script setup lang="ts">
import { shallowRef } from 'vue'
import { usePointsStore } from '@/stores/points'
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker
} from 'vue-yandex-maps'
import type { YMap } from '@yandex/ymaps3-types'

//Можно использовать для различных преобразований
const map = shallowRef<null | YMap>(null)

const pointsStore = usePointsStore()
</script>

<template>
  <yandex-map
    v-model="map"
    :settings="{
      location: {
        center: [37.617644, 55.755819],
        zoom: 3
      }
    }"
    width="100%"
    height="100%"
    class="border-round overflow-hidden"
  >
    <yandex-map-default-scheme-layer />
    <yandex-map-default-features-layer />

    <yandex-map-marker
      v-for="point in pointsStore.selectedPoints"
      :key="point.id"
      :settings="{ ...point, zIndex: point.id === pointsStore.currentPointId ? 1 : 0 }"
      class="w-1rem h-1rem border-circle cursor-pointer"
      :style="{
        backgroundColor:
          point.id === pointsStore.currentPointId ? 'var(--pink-500)' : 'var(--blue-500)'
      }"
      @click="
        () => {
          pointsStore.currentPointId = point.id
        }
      "
    >
      <div
        v-if="point.id === pointsStore.currentPointId"
        class="flex flex-column gap-2 popup border-round p-2"
        @click.stop
      >
        <div class="flex gap-2">
          <i className="pi pi-map"></i>
          {{ point.title }}
        </div>
        <div class="flex gap-2 overflow-hidden text-xs">
          <i className="pi pi-building text-xs"></i>
          {{ point.label }}
        </div>
        <div class="flex gap-2 overflow-hidden text-xs">
          <i className="pi pi-map-marker text-xs"></i>
          Точка {{ point.address }}
        </div>
      </div>
    </yandex-map-marker>
  </yandex-map>
</template>

<style scoped>
.popup {
  --width: 200px;
  position: absolute;
  width: 200px;
  bottom: 30px;
  translate: calc(-50% + 0.5rem) 0;
  background-color: white;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2));

  &::after {
    position: absolute;
    content: '';
    border: 10px solid transparent;
    border-top: 10px solid white;
    bottom: -20px;
    left: calc(50% - 10px);
  }
}
</style>
