import { Newsletter } from "@/types/newsletter";
import Newsletters from "./Content";
import { newsletters } from "./data/newsletters";

export default function NewslettersPage() {
  return (
    <div>
      <Newsletters newsletters={newsletters as Newsletter[]} />
    </div>
  );
}