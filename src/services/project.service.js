import projectModel from "../models/project.model.js";

export async function createProject(projectname){
  const project =  await projectModel.create({name:projectname})
  return project
}

export async function getallprojects(){
  const projects = await projectModel.find()
  return projects
}