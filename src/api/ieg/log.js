import request from '@/utils/request'

/**
 * save
 * @param schoolName schoolName
 * @param userName userName
 */
export const save = (schoolName, userName) => {
  return request({
    url: '/ieg/school/log/save',
    method: 'post',
    data: {
      schoolName: schoolName,
      userName: userName
    }
  })
}

/**
 * list
 * @param param param
 */
export const list = (param) => {
  return request({
    url: '/ieg/school/log/list',
    method: 'post',
    data: param
  })
}

/**
 * count
 * @param param param
 */
export const count = (param) => {
  return request({
    url: '/ieg/school/log/count',
    method: 'post',
    data: param
  })
}
