import { createProject } from "../services/project.service.js";
import { getallprojects } from "../services/project.service.js";

//jab project me services folder included hota hai tab CRUD ka core fucntion wahan hota hai
//  aur controller bas logic handle karta hai req,res ka
export async function createProjectController(req,res){
   const {projectname} = req.body
   const newProject = await createProject(projectname)
   return res.status(200).json({
     status:'success',
     data:newProject
   })
}

export async function getallprojectshandler(req,res){
  const projects  = await getallprojects()
  return res.status(200).json({
    status:'success',
    data:projects
  })
}

