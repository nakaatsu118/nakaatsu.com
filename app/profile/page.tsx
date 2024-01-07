import Footer from "~/_components/Footer";
import MotionWrapper from "~/_components/MotionWrapper";
import WhoIs from "./WhoIs";
import Works from "./Works";
import { getWorksList } from "~/_libs/microcms";
import Biography from "./Biography";
import ProgressBar from "~/_components/ProgressBar";

const Profile = async () => {
  const res = await getWorksList({ limit: 6, orders: '-published' })

  return (
    <MotionWrapper>
      <ProgressBar />
      <WhoIs />
      <Biography />
      <Works contents={res.contents} totalCount={0} limit={0} offset={0} />
      <Footer />
    </MotionWrapper>
  );
}

export default Profile;
