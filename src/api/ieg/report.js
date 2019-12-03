import request from '@/utils/request'

/**
 * list
 * @param obj obj
 */
export const list = (obj) => {
  return request({
    url: '/ieg/report/list',
    method: 'post',
    data: obj
  })
}

/**
 * detail
 * @param schoolId schoolId
 */
export const detail = (schoolId) => {
  return request({
    url: '/ieg/report/detail/' + schoolId,
    method: 'get'
  })
}
