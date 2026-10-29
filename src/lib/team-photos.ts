import chance from "@/assets/team/chance.jpg";
import fred from "@/assets/team/fred.jpg";
import paul from "@/assets/team/paul.jpg";
import nzwere from "@/assets/team/nzwere.jpg";
import grace from "@/assets/team/grace.jpg";
import ravasingadi from "@/assets/team/ravasingadi.jpg";
import kirth from "@/assets/team/kirth.jpg";
import nyambe from "@/assets/team/nyambe.jpg";
import mukumbi from "@/assets/team/mukumbi.jpg";
import graceKalungu from "@/assets/team/grace-kalungu.jpg";
import katowando from "@/assets/team/katowando.jpg";
import mathews from "@/assets/team/mathews.jpg";
import jasper from "@/assets/team/jasper.jpg";
import fredKusaloka from "@/assets/team/fred-kusaloka.jpg";
import kelvin from "@/assets/team/kelvin.jpg";
import mwila from "@/assets/team/mwila.jpg";

/** Live-site portraits cut at the chest, replaced by extended versions of the same photos. */
const map: Record<string, string> = {
  "chance_0_0-removebg-preview.png": chance,
  "fred-removebg-preview.png": fred,
  "paul-removebg-preview.png": paul,
  "m-nzwere_6-removebg-preview.png": nzwere,
  "grace.jpg": grace,
  "ravasingadi.jpg": ravasingadi,
  "kirth.png": kirth,
  "nyambe.png": nyambe,
  "Mukumbi-Kyalusanza.jpg": mukumbi,
  "grace.png": graceKalungu,
  "katowando.png": katowando,
  "mathews.png": mathews,
  "jasper.png": jasper,
  "fred.png": fredKusaloka,
  "kelvin.png": kelvin,
  "mwila.png": mwila,
};

export const teamPhoto = (src: string) => map[src.split("/").pop() ?? ""] ?? src;

export const isExtendedTeamPhoto = (src: string) => Boolean(map[src.split("/").pop() ?? ""]);
