import request from '@/utils/request'

/**
 * selectByRecordId
 * @param recordId recordId
 */
export const selectByRecordId = (recordId) => {
  return request({
    url: '/gauge/result/aks/find/' + recordId,
    method: 'get'
  })
}

export const modify = (obj) => {
  return request({
    url: '/gauge/result/aks/modify',
    method: 'put',
    data: obj
  })
}
