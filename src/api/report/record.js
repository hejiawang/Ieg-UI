import request from '@/utils/request'

/**
 * list
 * @param query
 */
export const list = (query) => {
  return request({
    url: '/report/student/record/list',
    method: 'get',
    params: query
  })
}

/**
 * save
 * @param obj obj
 */
export const save = (obj) => {
  return request({
    url: '/report/student/record/save',
    method: 'post',
    data: obj
  })
}

/**
 * modify
 * @param obj obj
 */
export const modify = (obj) => {
  return request({
    url: '/report/student/record/modify',
    method: 'put',
    data: obj
  })
}

/**
 * del
 * @param id id
 */
export const del = (id) => {
  return request({
    url: '/report/student/record/delete/' + id,
    method: 'delete'
  })
}
