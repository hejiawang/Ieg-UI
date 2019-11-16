import request from '@/utils/request'

/**
 * selectByRecordId
 * @param recordId recordId
 */
export const selectByRecordId = (recordId) => {
  return request({
    url: '/gauge/result/action/find/' + recordId,
    method: 'get'
  })
}

export const modify = (obj) => {
  return request({
    url: '/gauge/result/action/modify',
    method: 'put',
    data: obj
  })
}
