import { Metadata } from "next";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Настройки профілю | Neurolide",
  description: "Настройки профілю на Neurolide",
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return <>{children}</>;
};

export default ProtectedLayout;
