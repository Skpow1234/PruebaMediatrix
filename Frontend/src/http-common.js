import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7142/api/Government",
  headers: {
    "Content-type": "application/json",
    "Authorization":"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNDQxZDI0Ni00ZmEwLTQ5ODItOTRmMC01NTc4OWEyYjQxZmIiLCJqdGkiOiJmZjNmMzA0OS04NzNmLTRhOWYtOTc1Ny1lNzY0YjE1NDcxYWQiLCJuYmYiOjE3MjQ3MzQ0NTMsImV4cCI6MTc1NjI3MDQ1MywiaWF0IjoxNzI0NzM0NDUzfQ.kewrqJtBimzl_YpoowYsSCl-TvQmiQ2gYGa7DrOWfdk"
  }
});
