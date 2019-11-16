import request from '@/utils/request'

/**
 * listAll
 */
export const listAll = () => {
  return request({
    url: '/gauge/answer/info/listAll',
    method: 'get'
  })
}

/**
 * list
 */
export const list = (type) => {
  return request({
    url: '/gauge/answer/info/list',
    method: 'get',
    params: {
      type: type
    }
  })
}

/**
 * modify
 * @param obj obj
 */
export const modify = (obj) => {
  return request({
    url: '/gauge/answer/info/modify',
    method: 'put',
    data: obj
  })
}
