import http from "../http-common";

class GroupDataService {
  findUserList(data) {
    return http.post(`/groups`, data);
  }

  findUserGroups(data) {
    return http.post(`/groups/getGroups`, data);
  }

  insert(data) {
    return http.post(`/groups/insert`, data);
  }

  update(data) {
    return http.post(`/groups/update`, data);
  }

  delete(id) {
    return http.delete(`/groups/${id}`);
  }

  deleteAll() {
    return http.delete(`/groups`);
  }

}

export default new GroupDataService();
