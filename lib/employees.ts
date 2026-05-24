export interface Employee {
  id: string;
  name: string;
  email: string;
  title: string;
  department: string;
  manager: string | null;
  location: string;
  startDate: string;
  skills: string[];
  slackHandle: string;
}

export const EMPLOYEES: Employee[] = [
  {
    id: "emp-001",
    name: "Priya Sharma",
    email: "priya.sharma@novamart.com",
    title: "VP of Engineering",
    department: "Engineering",
    manager: null,
    location: "Bangalore",
    startDate: "2019-03-15",
    skills: ["system design", "distributed systems", "team leadership"],
    slackHandle: "@priya.sharma",
  },
  {
    id: "emp-002",
    name: "Alex Chen",
    email: "alex.chen@novamart.com",
    title: "Staff Engineer",
    department: "Engineering",
    manager: "Priya Sharma",
    location: "Remote — San Francisco",
    startDate: "2020-07-01",
    skills: ["kubernetes", "golang", "observability", "payment systems"],
    slackHandle: "@alex.chen",
  },
  {
    id: "emp-003",
    name: "Maria Rodriguez",
    email: "maria.r@novamart.com",
    title: "Senior Backend Engineer",
    department: "Engineering",
    manager: "Priya Sharma",
    location: "Bangalore",
    startDate: "2021-01-10",
    skills: ["java", "spring boot", "kafka", "inventory systems"],
    slackHandle: "@maria.r",
  },
  {
    id: "emp-004",
    name: "James Wilson",
    email: "james.w@novamart.com",
    title: "DevOps Lead",
    department: "Engineering",
    manager: "Priya Sharma",
    location: "Remote — Austin",
    startDate: "2020-11-20",
    skills: ["terraform", "aws", "ci/cd", "kubernetes", "monitoring"],
    slackHandle: "@james.w",
  },
  {
    id: "emp-005",
    name: "Aisha Patel",
    email: "aisha.p@novamart.com",
    title: "Head of Product",
    department: "Product",
    manager: null,
    location: "Bangalore",
    startDate: "2019-08-01",
    skills: ["product strategy", "user research", "roadmapping"],
    slackHandle: "@aisha.p",
  },
  {
    id: "emp-006",
    name: "Tom Baker",
    email: "tom.b@novamart.com",
    title: "HR Director",
    department: "HR",
    manager: null,
    location: "Bangalore",
    startDate: "2018-06-01",
    skills: ["talent acquisition", "employee relations", "compliance"],
    slackHandle: "@tom.b",
  },
  {
    id: "emp-007",
    name: "Sarah Kim",
    email: "sarah.k@novamart.com",
    title: "Frontend Lead",
    department: "Engineering",
    manager: "Priya Sharma",
    location: "Remote — Seoul",
    startDate: "2021-04-15",
    skills: ["react", "typescript", "next.js", "design systems"],
    slackHandle: "@sarah.k",
  },
  {
    id: "emp-008",
    name: "Raj Mehta",
    email: "raj.m@novamart.com",
    title: "Data Engineer",
    department: "Engineering",
    manager: "Alex Chen",
    location: "Bangalore",
    startDate: "2022-02-01",
    skills: ["spark", "airflow", "bigquery", "python", "data pipelines"],
    slackHandle: "@raj.m",
  },
];
