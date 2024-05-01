import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IPoint, IPointsList } from '@/interface'

export const usePointsStore = defineStore('counter', () => {
  const points = ref<IPointsList>([])
  const currentPointId = ref<string | undefined>()
  const filter = ref<string>('')
  const loading = ref<boolean>(true)
  const error = ref<boolean>(false)

  const filteredPoints = computed<IPointsList>(() => {
    const filterValue: string = filter.value.toLowerCase().trim()
    return points.value.filter(
      (point) =>
        point.title.toLowerCase().trim().includes(filterValue) ||
        point.address.toLowerCase().trim().includes(filterValue) ||
        point.label.toLowerCase().trim().includes(filterValue)
    )
  })

  const selectedPoints = computed<IPointsList>(() =>
    filteredPoints.value.filter((point) => point.selected)
  )

  const fetchPoints = async () => {
    try {
      // Здесь можно выполнить запрос к внешнему источнику данных
      const response = await import('@/assets/points.json')
      points.value = response.default.map((point) => ({
        ...point,
        selected: false
      })) as IPointsList
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  const selectAll = (status: boolean) => {
    points.value.forEach((point) => {
      point.selected = status
    })
  }

  return {
    points,
    currentPointId,
    filter,
    loading,
    error,
    selectedPoints,
    filteredPoints,
    fetchPoints,
    selectAll
  }
})
