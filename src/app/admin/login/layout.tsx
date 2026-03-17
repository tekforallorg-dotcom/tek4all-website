export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide root navbar/footer for login page */}
      <style>{`
        .site-navbar, .site-mobile-menu, footer, .gradient-cta { display: none !important; }
        main { padding: 0 !important; }
      `}</style>
      {children}
    </>
  );
}
