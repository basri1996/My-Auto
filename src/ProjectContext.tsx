import { createContext, useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://portfolio-165ba-default-rtdb.firebaseio.com/";
export const ProjectContext = createContext([]);

export function ProjectContextProvider({ children }) {
  const [projectsArray, setProjectsArray] = useState([]);

  console.log(projectsArray);

  useEffect(() => {
    async function fetchExpenses() {
      const response = await axios.get(BACKEND_URL + "/Projects.json");

      const Projects = [];

      for (const key in response.data) {
        const projectsObj = {
          id: key,
          desciption: response.data[key].desciption,
          language: response.data[key].language,
          title: response.data[key].title,
          image: response.data[key].image,
          link: response.data[key].link,
        };
        Projects.push(projectsObj);
      }
      setProjectsArray(Projects);
    }
    fetchExpenses();
  }, []);

  // useEffect(() => {
  //   async function storeProject() {
  //     const response = await axios.post(
  //       BACKEND_URL + "/Projects.json",
  //       projectsArray
  //     );
  //   }
  //   storeProject();
  // }, []);

  return (
    <ProjectContext.Provider value={projectsArray}>
      {children}
    </ProjectContext.Provider>
  );
}
