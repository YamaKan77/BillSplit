import http from "../http-common";

class BillDataService {
  getAll() {
    return http.get("/bill");
  }

  get(id) {
    return http.get(`/bill/${id}`);
  }

  create(data) {
    return http.post("/bill", data);
  }

  update(id, data) {
    return http.put(`/bill/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bill/${id}`);
  }

  deleteAll() {
    return http.delete(`/bill`);
  }

  findByTitle(title) {
    return http.get(`/bill?title=${title}`);
  }
}

export default new BillDataService();
