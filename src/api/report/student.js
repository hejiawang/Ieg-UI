import request from '@/utils/request'

/**
 * list
 * @param query
 */
export const listAll = (query) => {
  return request({
    url: '/report/student/listAll',
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
    url: '/report/student/save',
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
    url: '/report/student/modify',
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
    url: '/report/student/delete/' + id,
    method: 'delete'
  })
}

/**
 * checkCode
 * @param id id
 * @param code code
 */
export const checkCode = (id, code) => {
  return request({
    url: '/report/student/checkCode',
    data: {
      id: id,
      code: code
    },
    method: 'post'
  })
}

/**
 * find
 * @param id id
 */
export const find = (id) => {
  return request({
    url: '/report/student/find/' + id,
    method: 'get'
  })
}
