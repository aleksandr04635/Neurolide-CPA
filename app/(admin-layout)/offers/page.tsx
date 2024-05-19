import { format } from "date-fns";
import { Metadata } from "next";

import AllOffersList from "../_components/_offers-editing/all-offers-list";

export const metadata: Metadata = {
  title: "Список оферів | Neurolide",
  description: "Список всіх оферів Neurolide",
};

const OffersPage = () => {
  return <AllOffersList />;
};

export default OffersPage;
