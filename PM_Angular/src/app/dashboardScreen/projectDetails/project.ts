export class Project {
  id?: number;
  projectName!: string;
  projectDescription!: string;
  clientId!: number;
  projectManagerId?: number;
  createdDate?: string;
  status!: string;
  projectCost!: number;
}
