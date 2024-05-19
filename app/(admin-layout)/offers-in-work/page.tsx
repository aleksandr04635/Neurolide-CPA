import { format } from "date-fns";
import { Metadata } from "next";

import OffersInWorkList from "../_components/_offers-editing/offers-accepted-by-me";

export const metadata: Metadata = {
  title: "Офери в роботі | Neurolide",
  description: "Офери в роботі на Neurolide",
};

const OffersPage = async () => {
  return <OffersInWorkList />;
};

export default OffersPage;
