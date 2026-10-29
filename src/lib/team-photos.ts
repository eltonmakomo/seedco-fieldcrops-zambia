import chance from "@/assets/team/chance.jpg";
import fred from "@/assets/team/fred.jpg";
import paul from "@/assets/team/paul.jpg";
import nzwere from "@/assets/team/nzwere.jpg";
import grace from "@/assets/team/grace.jpg";
import ravasingadi from "@/assets/team/ravasingadi.jpg";

/** Live-site portraits cut at the chest, replaced by extended versions of the same photos. */
const map: Record<string, string> = {
  "chance_0_0-removebg-preview.png": chance,
  "fred-removebg-preview.png": fred,
  "paul-removebg-preview.png": paul,
  "m-nzwere_6-removebg-preview.png": nzwere,
  "grace.jpg": grace,
  "ravasingadi.jpg": ravasingadi,
};

export const teamPhoto = (src: string) => map[src.split("/").pop() ?? ""] ?? src;

export const isExtendedTeamPhoto = (src: string) => Boolean(map[src.split("/").pop() ?? ""]);
