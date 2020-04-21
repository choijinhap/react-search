import axios from "axios";

const NEWS_API_URL = "http://192.168.0.5:7501/api/search_json.jsp?";

class ApiService {
  NewsView() {
    return axios.get(NEWS_API_URL);
  }
  NewsSerch(query) {
    return axios.get(NEWS_API_URL + "&query=" + query);
  }
}

export default new ApiService();
