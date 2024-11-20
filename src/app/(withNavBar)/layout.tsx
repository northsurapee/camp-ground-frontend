import Footer from "@/components/layout/footer";
import NavigationBar from "@/components/layout/navigationBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationBar />
      {children}
      <Footer />
    </>
  );
}
