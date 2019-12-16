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
