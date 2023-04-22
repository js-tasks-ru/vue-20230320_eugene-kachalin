import { computed, isRef } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return (...args) => computed(() => {
    let arr = []
    args.forEach((el) => {
      if (isRef(el)) arr.push(el.value)
      else arr.push(el)
    })
    return func.apply(this, arr)
  });
}
// Скорее всего, неверно
