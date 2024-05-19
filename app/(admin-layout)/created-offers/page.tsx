import { format } from "date-fns";
import { Metadata } from "next";

import CreatedOffers from "../_components/_offers-editing/offers-created-by-me-list";

export const metadata: Metadata = {
  title: "Створені офери | Neurolide",
  description: "Список створених оферів на Neurolide",
};

const OffersPage = async () => {
  return <CreatedOffers />;
};

export default OffersPage;
