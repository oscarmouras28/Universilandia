import PublicLayout from "../layouts/PublicLayout";
import Review from "../components/review/Review";
import Career from "../components/review/Career";

export default function ReviewPage() {
  return (
    <PublicLayout>
      <Review />
      <Career />
    </PublicLayout>
  );
}
