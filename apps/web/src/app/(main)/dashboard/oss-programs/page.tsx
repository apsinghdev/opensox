import { getAllPrograms, getAllTags } from "@/data/oss-programs";
import ProgramsList from "./ProgramsList";

export const revalidate = 3600;

export default function Page() {
  const programs = getAllPrograms();
  const tags = getAllTags();

  return <ProgramsList programs={programs} tags={tags} />;
}
