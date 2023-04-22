import { ref, watch } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */
export function refHistory(source) {
  const history = ref([]);
  history.value.push(source.value)

  watch(source, (newValue) => {
    history.value.push(newValue)
  }, { flush: 'sync' })

  return { history };
}
